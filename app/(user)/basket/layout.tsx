import { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutBasket({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <section>
                <header>
                    <h3>Корзина</h3>
                </header>
                {children}
            </section>
        </div>
    )
}
