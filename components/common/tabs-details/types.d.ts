import type { TTabsDetailsRequest } from "@/types/types"
import type { Dispatch, FC, SetStateAction } from "react"

export interface IItemTab<T = TTabsDetailsRequest> {
    value: T
    label: string
    count?: number
    icon?: string
}

export interface ITabsDetails {
    items: IItemTab[]
    current: IItemTab
    set: Dispatch<SetStateAction<IItemTab>>
}

export type TTabsDetails = FC<ITabsDetails>
