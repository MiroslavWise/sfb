import { DispatchWithoutAction, FC } from "react"

type TTypeFilter = "price"

export interface IFilterMain {
    label: string
    type: boolean
    dispatch: DispatchWithoutAction
    typeFilter?: TTypeFilter
}

export interface IItemsMainCatalog {
    label: string
    value: string
    img: string
}

export type TItemsMainCatalog = FC<IItemsMainCatalog>
