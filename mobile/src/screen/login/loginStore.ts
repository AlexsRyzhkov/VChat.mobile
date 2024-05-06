import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

type State = {
    login: string,
    password: string
}

type Actions = {
    changeLogin: (newLogin: string) => void
    changePassword: (newPassword: string) => void
}

const DEFAULT_PROPS: State = {
    login: "",
    password: ""
}

export const useLoginStore = create<State & Actions>()(immer((set) => ({
    ...DEFAULT_PROPS,
    changeLogin: (newLogin: string) => set((state) => {
        state.login = newLogin
    }),
    changePassword: (newPassword: string) => set((state) => {
        state.password = newPassword
    })

})))