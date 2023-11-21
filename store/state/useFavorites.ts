import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { TUseFavorites } from "../types/createFavorites"

export const useFavorites = create(
    persist<TUseFavorites>(
        (set, get) => ({
            favorites: [],

            dispatchFavorites({ add, remove, all }) {
                console.log("dispatchFavorites: ", add, remove, all)
                if (add) {
                    const gets = get().favorites
                    set({ favorites: [...gets, add] })
                }
                if (typeof remove === "string") {
                    const gets = get().favorites
                    set({
                        favorites: gets.filter((item) => item.id !== remove),
                    })
                }
                if (Array.isArray(all)) {
                    set({ favorites: all })
                }
            },
        }),
        {
            name: "favorites",
            storage: createJSONStorage(() => sessionStorage),
            partialize(state) {
                return state
            },
        },
    ),
)
