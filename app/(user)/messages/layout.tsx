import { Metadata } from "next"

import { IChildrenProps } from "@/types/types"

import { LeftChats } from "@/components/pages/messages"

import styles from "./layout.module.scss"

export const metadata: Metadata = {
    title: "SFB - Чат",
}

export default function MessagesLayout({ children }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <LeftChats />
            {children}
        </div>
    )
}
