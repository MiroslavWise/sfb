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
        value: "/my-requests",
        label: "Мои запросы",
        icon: "/png/Menu/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.jpg",
        count: values?.countMyRequests || 0,
    },
    {
        value: "/my-products",
        label: "Мои товары",
        icon: "/png/Menu/erwan-hesry-RJjY5Hpnifk-unsplash.jpg",
        count: values?.countMyProducts || 0,
    },
    {
        value: "/delivery",
        label: "Доставка",
        icon: "/png/Menu/rosebox-BFdSCxmqvYc-unsplash.jpg",
        count: null,
    },
    {
        value: "/my-sales",
        label: "Мои продажи",
        icon: "/png/Menu/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg",
        count: null,
    },
    {
        value: "/my-orders",
        label: "Мои заказы",
        icon: "/png/Menu/daniel-bradley-y_WDEY9e6mA-unsplash.jpg",
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
