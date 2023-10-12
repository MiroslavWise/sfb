export const ITEMS_ASIDE_LEFT = (values: IValuesData): IItemsAsideLeft[] => [
    {
        value: "/proposals",
        label: "Предложения",
        icon: "/svg/proposals.svg",
        count: 3,
    },
    {
        value: "/messages",
        label: "Сообщения",
        icon: "/svg/messages.svg",
        count: 15,
    },
    {
        value: "/my-orders",
        label: "Мои заказы",
        icon: "/svg/orders.svg",
        count: null,
    },
    {
        value: "/profile",
        label: "Мой кабинет",
        icon: "/svg/proposals.svg",
        count: null,
    },
]

interface IItemsAsideLeft {
    value: string
    label: string
    icon: string
    count: number | null
}

interface IValuesData {}
