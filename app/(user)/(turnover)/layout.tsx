import type { IChildrenProps } from "@/types/types"

import { LeftAsideUser } from "@/components/layout/user/components/LeftAsideUser"

import styles from "./layout.module.scss"

export default function Layout({ children }: IChildrenProps) {
    return (
        <section className={styles.wrapper}>
            <LeftAsideUser />
            {children}
        </section>
    )
}
