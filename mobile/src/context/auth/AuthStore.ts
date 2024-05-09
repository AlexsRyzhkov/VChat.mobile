import {create, createStore} from "zustand";
import {immer} from "zustand/middleware/immer";
import * as SecureStore from 'expo-secure-store';

interface AuthState {
    userID: number | null,
}

interface AuthAction {
    setUserID: (newUserID:number)=>void
}

const DEFAULT_PROPS: AuthState = {
    userID: null
}

const useAuthStore = create<AuthState & AuthAction>()(immer(
    (set,get)=>({
        ...DEFAULT_PROPS,
        setUserID: (newUserID:number) => set(state=> {state.userID = newUserID})
    })
))


export {useAuthStore}