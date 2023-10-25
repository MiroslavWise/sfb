import type { IChildrenProps } from "@/types/types"
// import { HeaderChange } from "@/components/pages/profile"

import styles from "./layout.module.scss"

export default function LayoutChange({ children }: IChildrenProps) {
    return (
        <section className={styles.wrapper}>
            {/* <HeaderChange /> */}
            <article>{children}</article>
        </section>
    )
}
