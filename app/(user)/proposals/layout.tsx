import type { IChildrenProps } from "@/types/types"
import { HeaderMyProposals } from "@/components/pages/proposals"

import styles from "./layout.module.scss"

export default function LayoutProposals({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <HeaderMyProposals />
            {children}
        </div>
    )
}
