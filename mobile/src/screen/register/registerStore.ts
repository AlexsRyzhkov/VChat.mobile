import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    name: string,
    surname: string,
    login: string,
    password: string,
}

type ErrorState = {
    errors: {
        name: string,
        surname: string,
        login: string,
        password: string,
    }
}


type Actions = {
    changeState: (fieldsToUpdate: Partial<State>) => void
    reset: () => void
}

type RegisterFormState = State & ErrorState

const DEFAULT_PROPS: RegisterFormState = {
    name: "",
    surname: "",
    login: "",
    password: "",
    errors: {
        name: "",
        surname: "",
        login: "",
        password: ""
    },
}

export const useRegisterForm = create<RegisterFormState & Actions>()(immer((set) => ({
    ...DEFAULT_PROPS,
    changeState: (fieldsToUpdate: Partial<State>) => set(() => (fieldsToUpdate)),
    reset: () => set(() => (DEFAULT_PROPS))
})))