import { create } from "zustand"
import { IUseEnter } from "../types/createEnter"

export const useEnter = create<IUseEnter>(() => ({
    visible: false,
}))

export const dispatchEnter = (visible: boolean) =>
    useEnter.setState((_) => ({
        visible: visible,
    }))
