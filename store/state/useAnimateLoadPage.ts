import { create } from "zustand"

import type { IUseAnimateLoadPage } from "../types/createAnimateLoadPage"

export const useAnimateLoadPage = create<IUseAnimateLoadPage>(
    (set, get) => ({
        isAnimated: false,
        setIsAnimated(value) {
            if (get().isAnimated !== value) {
                set({ isAnimated: value })
            }
        },
    }),
)