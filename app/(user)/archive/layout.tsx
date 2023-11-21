import type { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutArchive({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <header>
                <h3>Архив</h3>
            </header>
            {children}
        </div>
    )
}
