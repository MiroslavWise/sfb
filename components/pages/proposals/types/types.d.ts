import type { FC } from "react"
import { IRequestProduct } from "../../my-requests/types/types"

export interface IItemHeaderCurrentMyProposals {
    value: string | number
    label: string
}

export interface IItemProposalsPage extends IRequestProduct {}

export type TItemHeaderCurrentMyProposals = FC<IItemHeaderCurrentMyProposals>
export type TItemProposalsPage = FC<IItemProposalsPage>
