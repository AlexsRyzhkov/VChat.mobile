import {create, createStore} from "zustand";
import {immer} from "zustand/middleware/immer";
import * as SecureStore from 'expo-secure-store';

interface AuthState {
    userID: number,
}

interface AuthAction {
    setUserID: (newUserID:number)=>void
}

const DEFAULT_PROPS: AuthState = {
    userID: Number(SecureStore.getItem('user_id')) || 0
}

const useAuthStore = create<AuthState & AuthAction>()(immer(
    (set,get)=>({
        ...DEFAULT_PROPS,
        setUserID: (newUserID:number) => set(state=> {state.userID = Number(newUserID)})
    })
))


export {useAuthStore}