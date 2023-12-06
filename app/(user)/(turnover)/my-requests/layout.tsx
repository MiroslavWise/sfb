import type { Metadata } from "next"

import type { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB- Мои запросы",
    description: "список моих запросов, а так-же личный их кабинет",
}

import styles from "./layout.module.scss"

export default function LayoutProposals({ children }: IChildrenProps) {
    return <div className={styles.wrapper}>{children}</div>
}
