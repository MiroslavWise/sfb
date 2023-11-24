import React from "react"

interface IProps {
    id: string
    int?: number
    isTitle?: boolean
}

export type TTypeButton = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    IProps
