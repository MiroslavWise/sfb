import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import { ICartList } from "@/types/shop"

import { queryCart } from "@/apollo/query-"
import { usePush } from "@/helpers/hooks/usePush"
import { queryChatTotalCount } from "@/apollo/chat"
import {
    queryNotificationTotal,
    queryProductListMeTotalArchive,
} from "@/apollo/query"
import { useFavorites } from "@/store/state/useFavorites"

export const ProfilePanel = () => {
    const { handlePush } = usePush()
    const pathname = usePathname()
    const { data: dataTotalNotifications } = useQuery(queryNotificationTotal)
    const { data: dataTotalChats } = useQuery(queryChatTotalCount)
    const { data: dataArchiveTotal } = useQuery(queryProductListMeTotalArchive)
    const { favorites } = useFavorites((_) => ({ favorites: _.favorites }))
    const { data: dataCart } = useQuery<ICartList>(queryCart)

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
                <Image
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
                <Image
                    src="/svg/box-black.svg"
                    alt="box-black"
                    width={24}
                    height={24}
                    onClick={() => {
                        handlePush("/archive")
                    }}
                />
                {dataArchiveTotal?.productListMe?.totalCount ? (
                    <div data-count data-chat>
                        <span>
                            {dataArchiveTotal?.productListMe?.totalCount || 0}
                        </span>
                    </div>
                ) : null}
            </div>
            <div data-notification>
                <Image
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
            <Image
                src={
                    isBuilding
                        ? "/svg/building-fill.svg"
                        : "/svg/building-regular.svg"
                }
                alt="building"
                width={24}
                height={24}
                onClick={() => {
                    handlePush("/my-shop")
                }}
            />
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
