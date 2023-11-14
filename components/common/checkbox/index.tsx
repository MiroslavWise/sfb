import { memo } from "react"

import type { TCheckbox } from "./types"

import styles from "./style.module.scss"
import Image from "next/image"

export const Checkbox: TCheckbox = memo(function $Checkbox({
    label,
    active,
    dispatch,
}) {
    console.log("Checkbox: active: ", active)
    return (
        <div
            className={styles.container}
            data-active={!!active}
            onClick={dispatch}
        >
            <div data-check-box>
                {active && (
                    <Image
                        src="/svg/check.svg"
                        alt="check"
                        width={16}
                        height={16}
                    />
                )}
            </div>
            {label && <p>{label}</p>}
        </div>
    )
})
