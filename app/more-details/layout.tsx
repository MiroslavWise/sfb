import { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutMore({ children }: IChildrenProps) {
    return (
        <section className={styles.wrapper}>
            <aside></aside>
            {children}
        </section>
    )
}
