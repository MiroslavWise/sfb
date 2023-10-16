import type { FC } from "react"

export interface IItemHeaderCurrentMyProposals {
    value: string | number
    label: string
}

export interface IItemProposalsPage {}

export type TItemHeaderCurrentMyProposals = FC<IItemHeaderCurrentMyProposals>
export type TItemProposalsPage = FC<IItemProposalsPage>
