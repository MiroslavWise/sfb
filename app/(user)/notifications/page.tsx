"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"

import { queryNotificationList } from "@/apollo/query"

import styles from "./style.module.scss"

export default function Notifications() {
    const { data } = useQuery(queryNotificationList)

    console.log("data: ", data)

    return (
        <main className={styles.wrapper}>
            <header>
                <h1>Уведомления</h1>
                <button data-all-reading>
                    <span>Прочитать всё</span>
                    <Image
                        src="/svg/bell-minus.svg"
                        alt="bell-minus"
                        width={20}
                        height={20}
                    />
                </button>
            </header>
            <section></section>
        </main>
    )
}
