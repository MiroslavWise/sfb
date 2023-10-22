import type { FC, ReactNode } from "react"

export interface IOutline {
    children: ReactNode
    label: string
}

export type TOutline = FC<IOutline>
