import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { queryNotificationTotal } from "@/apollo/query"
import { queryChatUnreadCount } from "@/apollo/query-"

export const ProfilePanel = () => {
    const { handlePush } = usePush()
    const pathname = usePathname()
    const { data: dataTotalNotifications } = useQuery(queryNotificationTotal)
    const { isCommercial } = useAuth((_) => ({
        isCommercial: _.user?.isCommercial,
    }))
    const { data: dataCountChatUnread } = useQuery(queryChatUnreadCount)

    const lengthNotification: number | string = useMemo(() => {
        if (dataTotalNotifications?.notificationList?.totalCount > 9) {
            return "*"
        }
        return dataTotalNotifications?.notificationList?.totalCount || 0
    }, [dataTotalNotifications?.notificationList?.totalCount])

    const isBuilding = [
        "/my-requests",
        "/my-products",
        "/delivery",
        "/my-sales",
        "/my-orders",
        "/my-shop",
    ].includes(pathname)

    return (
        <div data-chat-notification>
            <img
                src={
                    isBuilding
                        ? "/svg/building-fill.svg"
                        : "/svg/building-regular.svg"
                }
                alt="building"
                width={24}
                height={24}
                onClick={() => {
                    handlePush(isCommercial ? "/my-shop" : "/my-products")
                }}
            />
            <div data-notification>
                <img
                    src="/svg/menu/message-notification-circle.svg"
                    alt="icon"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/messages")
                    }}
                />
                {dataCountChatUnread?.chatUnreadCount?.totalCount ? (
                    <div data-count data-chat>
                        <span>
                            {dataCountChatUnread?.chatUnreadCount?.totalCount}
                        </span>
                    </div>
                ) : null}
            </div>
            <div data-notification>
                <img
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
            <img
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
