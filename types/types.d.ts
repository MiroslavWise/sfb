import { FC, ReactNode } from "react"

export interface IChildrenProps {
    children: ReactNode
}

export type TChildrenProps = FC<IChildrenProps>
