export const ITEMS_ASIDE_LEFT = (values: IValuesData): IItemsAsideLeft[] => [
    // {
    //     value: "/proposals",
    //     label: "Предложения",
    //     icon: "/svg/proposals.svg",
    //     count: 3,
    // },
    {
        value: "/my-requests",
        label: "Мои запросы",
        icon: "/svg/proposals.svg",
        count: values?.countMyRequests || 0,
    },
    {
        value: "/my-products",
        label: "Мои товары",
        icon: "/svg/proposals.svg",
        count: values?.countMyProducts || 0,
    },
    {
        value: "/messages",
        label: "Сообщения",
        icon: "/svg/messages.svg",
        count: values?.constMessages || 0,
    },
    {
        value: "/my-orders",
        label: "Мои заказы",
        icon: "/svg/orders.svg",
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
