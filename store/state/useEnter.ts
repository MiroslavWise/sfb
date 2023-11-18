import { create } from "zustand"
import { IUseEnter } from "../types/createEnter"

export const useEnter = create<IUseEnter>((set) => ({
    visible: false,

    dispatch({ visible }) {
        set({ visible: visible })
    },
}))
