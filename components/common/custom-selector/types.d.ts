import type { Dispatch, DispatchWithoutAction, FC } from "react"

interface IProps {
    label: string
    valueTag?: string
    onClick: Dispatch<string>
    list: null | { p: string; a?: string; id: string }[]
    value?: string
    placeholder: string
}

export type TProps = FC<IProps>
