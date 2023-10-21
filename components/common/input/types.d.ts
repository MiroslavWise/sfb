import React from "react"

interface IAdditional {
    label: string
    error: any
}

export type TProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    IAdditional
