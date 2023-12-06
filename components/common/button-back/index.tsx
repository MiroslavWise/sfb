import { forwardRef } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const ButtonBack = forwardRef(function $ButtonBack(props: TProps, ref: any) {
    return (
        <button {...props} className={styles.button} ref={ref}>
            <img src="/svg/arrow-left.svg" alt="chevron" width={24} height={24} />
        </button>
    )
})
