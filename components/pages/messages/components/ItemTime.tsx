import type { TItemTime } from "../types/types"

import { cx } from "@/helpers/lib/cx"

import styles from "../styles/time.module.scss"

export const ItemTime: TItemTime = ({ time }) => {
    return (
        <div className={cx(styles.wrapper, "sticky")}>
            <div className={styles.container}>
                <span>{time}</span>
            </div>
        </div>
    )
}
