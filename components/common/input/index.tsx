"use client"

import { forwardRef, useState } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const Input = forwardRef(function Input(props: TProps) {
    const { label, error, value, ...rest } = props ?? {}
    const [focus, setFocus] = useState(false)

    return (
        <span
            className={styles.container}
            data-focus={focus || !!value || value === 0}
            data-error={!!error}
        >
            <label>{label}</label>
            <input
                {...rest}
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </span>
    )
})
