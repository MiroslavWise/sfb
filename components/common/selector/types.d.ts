import { CFormSelectProps } from "@coreui/react/dist/components/form/CFormSelect"
import React from "react"

interface IProps {
    label: string
    options: {
        label: string
        value: any
    }[]
}

export type TProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    React.HTMLInputElement
> &
    CFormSelectProps &
    IProps
