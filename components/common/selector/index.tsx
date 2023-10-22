"use client"

import { forwardRef } from "react"

import { CFormSelect } from "@coreui/react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const Selector = forwardRef(function Selector(props: TProps, ref: any) {
    const { label, options, ...rest } = props

    return (
        <div className={styles.container} data-selector>
            <label>{label}</label>
            <CFormSelect data-select ref={ref} options={options} {...rest} />
        </div>
    )
})
