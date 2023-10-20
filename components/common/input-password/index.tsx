"use client"

import { LegacyRef, forwardRef, useState } from "react"

import type { TTypeInputPassword } from "./types"

import styles from "./styles.module.scss"

const Security = ({ value }: { value: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="#000"
        width="20"
        height="20"
    >
        <path
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
    </svg>
)

export const InputPassword = forwardRef(function InputPassword(
    props: TTypeInputPassword,
    ref: LegacyRef<HTMLInputElement>,
) {
    const { error, ...rest } = props
    const [visible, setVisible] = useState(false)

    return (
        <span className={styles.container}>
            <input type={visible ? "text" : "password"} ref={ref} {...rest} />
            <div
                onClick={() => setVisible((prev) => !prev)}
                data-visible-img
                data-visible-value={visible}
            >
                <Security value={visible} />
            </div>
            {error ? <i>{error}</i> : null}
        </span>
    )
})
