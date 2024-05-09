import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    login: string,
    password: string,
}

type ErrorState = {
    errors: {
        login: string,
        password: string,
    }
}

type Actions = {
    changeState: (fieldsToUpdate: Partial<State>) => void
    reset: () => void
}

type LoginFormState = State & ErrorState

const DEFAULT_PROPS: LoginFormState = {
    login: "",
    password: "",
    errors: {
        login: "",
        password: ""
    },
}

export const useLoginForm = create<LoginFormState & Actions>()(immer((set) => ({
    ...DEFAULT_PROPS,
    changeState: (fieldsToUpdate: Partial<State>) => set(() => (fieldsToUpdate)),
    reset: () => set(() => (DEFAULT_PROPS))
})))