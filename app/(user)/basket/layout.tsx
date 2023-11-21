import { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutBasket({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <header>
                <h3>Корзина</h3>
            </header>
            {children}
        </div>
    )
}
