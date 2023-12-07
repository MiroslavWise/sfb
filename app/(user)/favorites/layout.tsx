import type { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutFavorites({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <header>
                <h3>Избранное</h3>
            </header>
            {children}
        </div>
    )
}
