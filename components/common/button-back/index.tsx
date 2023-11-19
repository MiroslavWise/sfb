import Image from "next/image"
import { forwardRef } from "react"

import { TProps } from "./types"

import styles from "./style.module.scss"

export const ButtonBack = forwardRef(function $ButtonBack(props: TProps) {
    return (
        <button {...props} className={styles.button}>
            <Image
                src="/svg/chevron-left.svg"
                alt="chevron"
                width={20}
                height={20}
            />
        </button>
    )
})
