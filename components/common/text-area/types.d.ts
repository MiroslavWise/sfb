import React from "react"

interface IAdditional {
    label: string
    error: any
}

export type TProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    IAdditional
