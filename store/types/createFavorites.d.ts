import { Dispatch } from "react"

interface IStateFavorites {
    favorites: {
        id: string
        productId: string
    }[]
}

interface IAction {
    add?: {
        id: string
        productId: string
    }
    remove?: string

    all?: {
        id: string
        productId: string
    }[]
}

interface IActionFavorites {
    dispatchFavorites: Dispatch<IAction>
}

export type TUseFavorites = IStateFavorites & IActionFavorites
