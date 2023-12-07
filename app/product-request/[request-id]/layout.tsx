import { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function LayoutProductRequestId({ children }: IChildrenProps) {
    return <div className={styles.wrapper}>{children}</div>
}
