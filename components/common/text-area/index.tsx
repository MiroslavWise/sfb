"use client"

import { forwardRef } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const TextArea = forwardRef(function Input(props: TProps, ref: any) {
    const { label, error, value, ...rest } = props ?? {}

    return (
        <span className={styles.container} data-error={!!error}>
            <label>{label}</label>
            <textarea {...rest} value={value} ref={ref} />
            {error ? <i>{error}</i> : null}
        </span>
    )
})
