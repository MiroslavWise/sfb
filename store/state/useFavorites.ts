import { Dispatch } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { TUseFavorites, IAction } from "../types/createFavorites"

export const useFavorites = create(
    persist<TUseFavorites>(
        () => ({
            favorites: [],
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

export const dispatchFavorites: Dispatch<IAction> = ({ add, remove, all }) =>
    useFavorites.setState((_) => {
        console.log("dispatchFavorites: ", add, remove, all)
        if (add) {
            return {
                favorites: [..._.favorites, add],
            }
        }
        if (typeof remove === "string") {
            return {
                favorites: _.favorites.filter((item) => item.id !== remove),
            }
        }
        if (Array.isArray(all)) {
            return {
                favorites: all,
            }
        }
        return {
            ..._,
        }
    })
