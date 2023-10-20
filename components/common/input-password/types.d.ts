import { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface IProps {
    error?: string
}

export type TTypeInputPassword = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    IProps
