export const ITEMS_ASIDE_LEFT = (values: IValuesData): IItemsAsideLeft[] => [
    {
        value: "/my-requests",
        label: "Мои запросы",
        icon: "/svg/profile/announcement-02.svg",
        count: values?.countMyRequests || 0,
    },
    {
        value: "/my-products",
        label: "Мои товары",
        icon: "/svg/profile/database-02.svg",
        count: values?.countMyProducts || 0,
    },
    {
        value: "/messages",
        label: "Сообщения",
        icon: "/svg/menu/message-notification-circle.svg",
        count: values?.constMessages || 0,
    },
    {
        value: "/delivery",
        label: "Доставка",
        icon: "/svg/profile/route.svg",
        count: null,
    },
    {
        value: "/my-sales",
        label: "Мои продажи",
        icon: "/svg/profile/scales-01.svg",
        count: null,
    },
    {
        value: "/my-orders",
        label: "Мои заказы",
        icon: "/svg/profile/package.svg",
        count: null,
    },
]

interface IItemsAsideLeft {
    value: string
    label: string
    icon: string
    count: number | null
}

interface IValuesData {
    countMyRequests?: number
    countMyProducts?: number
    constMessages?: number
}
