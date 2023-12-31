"use client"

import { forwardRef } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const Input = forwardRef(function Input(props: TProps, ref: any) {
    const { label, error, value, name, ...rest } = props ?? {}

    return (
        <span className={styles.container} data-error={!!error}>
            <label htmlFor={name}>{label}</label>
            <input {...rest} value={value} name={name} ref={ref} />
            {error ? <i>{error}</i> : null}
        </span>
    )
})
