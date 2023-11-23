import React from "react"

interface IProps {
    id: string
    int?: number
}

export type TTypeButton = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    IProps
