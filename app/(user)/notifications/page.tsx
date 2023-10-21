"use client"

import Image from "next/image"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"

import { ItemNotification } from "@/components/pages/notifications"

import { IQueryNotifications } from "@/types/chat"
import { mutateNotificationReadAll } from "@/apollo/mutation"
import { queryNotificationList, queryNotificationTotal } from "@/apollo/query"

import styles from "./style.module.scss"

export default function Notifications() {
    const { data, refetch, loading } = useQuery<IQueryNotifications>(
        queryNotificationList,
    )
    const [allReading] = useMutation(mutateNotificationReadAll)
    const [reading] = useLazyQuery(queryNotificationTotal)

    function handle() {
        allReading().finally(() => {
            Promise.all([reading(), refetch()])
        })
    }

    return (
        <main className={styles.wrapper}>
            <header>
                <h1>Уведомления</h1>
                <button data-all-reading onClick={handle}>
                    <span>Прочитать всё</span>
                    <Image
                        src="/svg/bell-minus.svg"
                        alt="bell-minus"
                        width={20}
                        height={20}
                    />
                </button>
            </header>
            <section>
                {data?.notificationList?.results?.length ? (
                    data?.notificationList?.results?.map((item) => (
                        <ItemNotification key={`${item?.id}`} {...item} />
                    ))
                ) : !loading ? (
                    <h2>У вас нет непрочитанных уведомлений</h2>
                ) : null}
            </section>
        </main>
    )
}
