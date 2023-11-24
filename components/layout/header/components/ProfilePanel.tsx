import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import { ICartList } from "@/types/shop"

import { queryCart, queryChatUnreadCount } from "@/apollo/query-"
import { usePush } from "@/helpers/hooks/usePush"
import { queryChatTotalCount } from "@/apollo/chat"
import {
    queryNotificationTotal,
    queryProductListMeTotalArchive,
} from "@/apollo/query"
import { useFavorites } from "@/store/state/useFavorites"
import { useAuth } from "@/store/state/useAuth"

export const ProfilePanel = () => {
    const { handlePush } = usePush()
    const pathname = usePathname()
    const { data: dataTotalNotifications } = useQuery(queryNotificationTotal)
    const { data: dataTotalChats } = useQuery(queryChatTotalCount)
    const { favorites } = useFavorites((_) => ({ favorites: _.favorites }))
    const { data: dataCart } = useQuery<ICartList>(queryCart)
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

    const totalCart = useMemo(() => {
        return dataCart?.cart?.cartItemList?.length || 0
    }, [dataCart?.cart])

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
            <div data-notification>
                <img
                    src="/svg/tag-01.svg"
                    alt="tag-01"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/favorites")
                    }}
                />
                {favorites.length ? (
                    <div data-count data-chat>
                        <span>{favorites.length}</span>
                    </div>
                ) : null}
            </div>
            <div data-notification>
                <img
                    src="/svg/shopping-cart-01.svg"
                    alt="shopping-cart-01"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/basket")
                    }}
                />
                {totalCart ? (
                    <div data-count data-chat>
                        <span>{totalCart}</span>
                    </div>
                ) : null}
            </div>
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
