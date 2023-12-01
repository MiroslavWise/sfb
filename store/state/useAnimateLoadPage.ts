import { create } from "zustand"

import type { IUseAnimateLoadPage } from "../types/createAnimateLoadPage"

export const useAnimateLoadPage = create<IUseAnimateLoadPage>()(() => ({
    isAnimated: false,
}))

export const animatedLoadPage = (value: boolean) =>
    useAnimateLoadPage.setState((_) => ({
        isAnimated: value,
    }))
