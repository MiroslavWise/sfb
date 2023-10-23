import { FC } from "react"

export interface IFilterMain {
    label: string
}

export interface IItemsMainCatalog {
    label: string
    value: string
    img: string
}

export type TItemsMainCatalog = FC<IItemsMainCatalog>
