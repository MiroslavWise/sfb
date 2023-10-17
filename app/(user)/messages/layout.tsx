import { LeftChats } from "@/components/pages/messages"
import { IChildrenProps } from "@/types/types"

import styles from "./layout.module.scss"

export default function MessagesLayout({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <LeftChats />
            {children}
        </div>
    )
}
