import type { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutProposals({ children }: IChildrenProps) {
    return <div className={styles.wrapper}>{children}</div>
}
