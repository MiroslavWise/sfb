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
    // {
    //     value: "/messages",
    //     label: "Сообщения",
    //     icon: "/svg/menu/message-notification-circle.svg",
    //     count: values?.constMessages || 0,
    // },
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

export const ITEMS_ASIDE_LEFT_PICTURE = (
    values: IValuesData,
): IItemsAsideLeft[] => [
    {
        value: "/my-shop",
        label: "Мои магазины",
        icon: "/magazine/marcos-rivas-HX_QUGNAjDo-unsplash.jpg",
        count: null,
    },
    {
        value: "/my-requests",
        label: "Мои запросы",
        icon: "/magazine/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.jpg",
        count: values?.countMyRequests || 0,
    },
    {
        value: "/my-products",
        label: "Мои товары",
        icon: "/magazine/erwan-hesry-RJjY5Hpnifk-unsplash.jpg",
        count: values?.countMyProducts || 0,
    },
    {
        value: "/delivery",
        label: "Доставка",
        icon: "/magazine/rosebox-BFdSCxmqvYc-unsplash.jpg",
        count: null,
    },
    {
        value: "/my-sales",
        label: "Мои продажи",
        icon: "/magazine/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg",
        count: null,
    },
    {
        value: "/my-orders",
        label: "Мои заказы",
        icon: "/magazine/daniel-bradley-y_WDEY9e6mA-unsplash.jpg",
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
