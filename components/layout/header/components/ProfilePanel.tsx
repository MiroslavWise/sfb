import Image from "next/image"
import { memo, useMemo } from "react"
import { useQuery } from "@apollo/client"

import { usePush } from "@/helpers/hooks/usePush"
import { queryChatTotalCount } from "@/apollo/chat"
import { queryNotificationTotal } from "@/apollo/query"

const $ProfilePanel = () => {
    const { handlePush } = usePush()
    const { data: dataTotalNotifications, loading } = useQuery(
        queryNotificationTotal,
    )
    const { data: dataTotalChats } = useQuery(queryChatTotalCount)

    console.log("loading queryNotificationTotal: ", loading)

    const lengthNotification: number | string = useMemo(() => {
        if (dataTotalNotifications?.notificationList?.totalCount > 9) {
            return "*"
        }
        return dataTotalNotifications?.notificationList?.totalCount || 0
    }, [dataTotalNotifications?.notificationList?.totalCount])
    const lengthChat: number | string = useMemo(() => {
        if (dataTotalChats?.chatList?.totalCount > 9) {
            return "*"
        }
        return dataTotalChats?.chatList?.totalCount || 0
    }, [dataTotalChats?.chatList?.totalCount])

    return (
        <div data-chat-notification>
            <div data-notification>
                <Image
                    src="/svg/menu/message-notification-circle.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/messages")
                    }}
                />
                {lengthChat ? (
                    <div data-count data-chat>
                        <span>{lengthChat}</span>
                    </div>
                ) : null}
            </div>
            <div data-notification>
                <Image
                    src="/svg/menu/bell-03.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/notifications")
                    }}
                />
                {lengthNotification ? (
                    <div data-count>
                        <span>{lengthNotification}</span>
                    </div>
                ) : null}
            </div>
            <Image
                src="/svg/menu/user-02.svg"
                alt="icon"
                width={24}
                height={24}
                onClick={() => {
                    handlePush("/profile")
                }}
            />
        </div>
    )
}

export const ProfilePanel = memo($ProfilePanel)
