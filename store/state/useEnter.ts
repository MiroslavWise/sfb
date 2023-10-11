import { create } from "zustand"
import { IUseEnter } from "../types/createEnter"

export const useEnter = create<IUseEnter>((set, get) => ({
    visible: false,

    dispatch({ visible }) {
        set({ visible: visible })
    },
}))
