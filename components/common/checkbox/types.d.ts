import { DispatchWithoutAction, FC } from "react"

interface ICheckbox {
    label?: string
    active?: boolean
    dispatch: DispatchWithoutAction
}

export type TCheckbox = FC<ICheckbox>
