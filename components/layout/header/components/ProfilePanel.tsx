import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import { Svg } from "./NavigateMenuOther"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { queryNotificationTotal } from "@/apollo/query"
import { queryChatUnreadCount } from "@/apollo/query-"

export const ProfilePanel = () => {
    const { handlePush } = usePush()
    const pathname = usePathname()
    const user = useAuth(({ user }) => user)
    const { photo, isCommercial } = user ?? {}
    const { data: dataTotalNotifications } = useQuery(queryNotificationTotal)
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
            <div
                data-notification
                onClick={() => {
                    handlePush(isCommercial ? "/my-shop" : "/my-products")
                }}
            >
                <div data-svg>
                    <Svg pathD="M15 21V15.6C15 15.0399 15 14.7599 14.891 14.546C14.7951 14.3578 14.6422 14.2049 14.454 14.109C14.2401 14 13.9601 14 13.4 14H10.6C10.0399 14 9.75992 14 9.54601 14.109C9.35785 14.2049 9.20487 14.3578 9.10899 14.546C9 14.7599 9 15.0399 9 15.6V21M3 7C3 8.65685 4.34315 10 6 10C7.65685 10 9 8.65685 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 8.65685 16.3431 10 18 10C19.6569 10 21 8.65685 21 7M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" />
                </div>
                <p>{isCommercial ? "Магазин" : "Запросы"}</p>
            </div>
            <div
                data-notification
                onClick={() => {
                    handlePush("/messages")
                }}
            >
                <div data-svg>
                    <Svg pathD="M11.707 3.03647C7.38421 3.43621 3.99962 7.07285 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.44299 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78121 19.299 8.85882 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20C16.9304 20 20.5694 16.6098 20.9641 12.2819M20.1209 3.87868C21.2925 5.05025 21.2925 6.94975 20.1209 8.12132C18.9494 9.29289 17.0499 9.29289 15.8783 8.12132C14.7067 6.94975 14.7067 5.05025 15.8783 3.87868C17.0499 2.70711 18.9494 2.70711 20.1209 3.87868Z" />
                    {dataCountChatUnread?.chatUnreadCount?.totalCount ? (
                        <div data-count data-chat>
                            <span>
                                {
                                    dataCountChatUnread?.chatUnreadCount
                                        ?.totalCount
                                }
                            </span>
                        </div>
                    ) : null}
                </div>
                <p>Сообщения</p>
            </div>
            <div
                data-notification
                onClick={() => {
                    handlePush("/notifications")
                }}
            >
                <div data-svg>
                    <Svg pathD="M14.9997 19C14.9997 20.6569 13.6566 22 11.9997 22C10.3429 22 8.99972 20.6569 8.99972 19M13.7962 6.23856C14.2317 5.78864 14.4997 5.17562 14.4997 4.5C14.4997 3.11929 13.3804 2 11.9997 2C10.619 2 9.49972 3.11929 9.49972 4.5C9.49972 5.17562 9.76772 5.78864 10.2032 6.23856M17.9997 11.2C17.9997 9.82087 17.3676 8.49823 16.2424 7.52304C15.1171 6.54786 13.591 6 11.9997 6C10.4084 6 8.8823 6.54786 7.75708 7.52304C6.63186 8.49823 5.99972 9.82087 5.99972 11.2C5.99972 13.4818 5.43385 15.1506 4.72778 16.3447C3.92306 17.7056 3.5207 18.3861 3.53659 18.5486C3.55476 18.7346 3.58824 18.7933 3.73906 18.9036C3.87089 19 4.53323 19 5.85791 19H18.1415C19.4662 19 20.1286 19 20.2604 18.9036C20.4112 18.7933 20.4447 18.7346 20.4629 18.5486C20.4787 18.3861 20.0764 17.7056 19.2717 16.3447C18.5656 15.1506 17.9997 13.4818 17.9997 11.2Z" />
                    {lengthNotification ? (
                        <div data-count>
                            <span>{lengthNotification}</span>
                        </div>
                    ) : null}
                </div>
                <p>Уведомления</p>
            </div>
            <div
                data-notification
                onClick={() => {
                    handlePush("/profile")
                }}
            >
                <div data-svg>
                    {photo ? (
                        <Image
                            src={photo}
                            alt="avatar"
                            width={32}
                            height={32}
                            unoptimized
                        />
                    ) : (
                        <Svg pathD="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
                    )}
                </div>
                <p>Профиль</p>
            </div>
        </div>
    )
}
