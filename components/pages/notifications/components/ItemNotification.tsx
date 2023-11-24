"use client"

import Image from "next/image"
import { useLazyQuery, useMutation } from "@apollo/client"

import { IItemNotification } from "@/types/chat"
import { queryNotificationList, queryNotificationTotal } from "@/apollo/query"
import { mutateReadNotification } from "@/apollo/mutation"
import { usePush } from "@/helpers/hooks/usePush"

export const ItemNotification = (props: IItemNotification) => {
    const { verb, id } = props ?? {}
    const { handlePush } = usePush()
    const [refreshTotal] = useLazyQuery(queryNotificationTotal)
    const [refreshList] = useLazyQuery(queryNotificationList)
    const [reading] = useMutation(mutateReadNotification, {
        variables: {
            notificationId: id,
        },
    })

    function handleRead() {
        reading().finally(() => {
            Promise.all([refreshTotal(), refreshList()])
        })
    }

    function handleRestrict() {
        reading().finally(() => {
            Promise.all([refreshTotal(), refreshList()])
            requestAnimationFrame(() => {
                // handlePush
            })
        })
    }

    return (
        <div data-item-notification>
            <header>
                <img
                    src="/svg/bell-ringing-03.svg"
                    alt="bell"
                    width={40}
                    height={40}
                />
                <h3>{verb}</h3>
            </header>
            <footer>
                <button data-default onClick={handleRead}>
                    <span>Прочитано</span>
                </button>
                <button data-black onClick={handleRestrict}>
                    <span>Перейти</span>
                    <img
                        src="/svg/share-06.svg"
                        alt="share"
                        width={18}
                        height={18}
                    />
                </button>
            </footer>
        </div>
    )
}
