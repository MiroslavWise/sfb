import { IRequestProduct } from "@/types/types"
import type { FC } from "react"

export interface IItemHeaderCurrentMyProposals {
    value: string | number
    label: string
}

export interface IItemProposalsPage extends IRequestProduct {}

export type TItemHeaderCurrentMyProposals = FC<IItemHeaderCurrentMyProposals>
export type TItemProposalsPage = FC<IItemProposalsPage>
