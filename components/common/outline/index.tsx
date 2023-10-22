import type { TOutline } from "./types"

import styles from "./style.module.scss"

export const Outline: TOutline = ({ children, label }) => {
    return (
        <div className={styles.container}>
            <h6>{label}:</h6>
            {children}
        </div>
    )
}
