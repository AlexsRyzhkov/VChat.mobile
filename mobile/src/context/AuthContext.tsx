import {create, createStore, useStore} from "zustand";
import {immer} from "zustand/middleware/immer";
import * as SecureStore from 'expo-secure-store';
import {createContext, FC, PropsWithChildren, useContext, useEffect, useRef} from "react";
import $api from "../http";

interface AuthState {
    userID: number,
}

interface AuthAction {
    setUserID: (newUserID:number)=>void
}

const createAuthStore = () => {
    const DEFAULT_PROPS: AuthState = {
        userID: Number(SecureStore.getItem('user_id')) || 0
    }

    return createStore<AuthState & AuthAction>()(immer(
        (set,get)=>({
            ...DEFAULT_PROPS,
            setUserID: (newUserID:number) => set(state=> {state.userID = Number(newUserID)})
        })
    ))
}

type AuthStore = ReturnType<typeof createAuthStore>

const AuthContext = createContext<AuthStore | null>(null)

export const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const store = useRef(createAuthStore()).current
    const {setUserID} = useStore(store, s=>s)

    useEffect(()=>{
        (async ()=>{
            try{
                const response = await $api.get('/me')
                setUserID(response.data['user']['id'])
            }catch (e:any){
                console.log(e.message)
            }
        })()
    },[SecureStore.getItem('access_store')])

    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {
    const store = useContext(AuthContext)
    if (!store) throw new Error('Missing Auth.Provider in the tree')
    return useStore(store, s=>s)
}