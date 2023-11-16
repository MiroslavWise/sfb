"use client"

import { forwardRef, useState } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const Input = forwardRef(function Input(props: TProps) {
    const { label, error, value, ...rest } = props ?? {}

    return (
        <span className={styles.container} data-error={!!error}>
            <label>{label}</label>
            <input {...rest} value={value} />
        </span>
    )
})
