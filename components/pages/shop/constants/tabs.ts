import type { IItemTab } from "@/components/common/tabs-details/types"

export type TTypeValue = "" | "store-managers" | "merchandise" | "sales" | "delivery-of-goods" | "products"

export const TABS_SHOP_DETAIL: IItemTab<TTypeValue>[] = [
    {
        value: "",
        label: "Основная информация",
        icon: "/magazine/icons/grid-01.svg",
    },
    {
        value: "store-managers",
        label: "Менеджеры магазина",
        icon: "/magazine/icons/users-03.svg",
    },
    {
        value: "merchandise",
        label: "Товары",
        icon: "/magazine/icons/package.svg",
    },
    {
        value: "sales",
        label: "Продажи",
        icon: "/magazine/icons/package-check.svg",
    },
    {
        value: "delivery-of-goods",
        label: "Доставки товаров",
        icon: "/magazine/icons/dataflow-03.svg",
    },
]

export const TABS_SHOP_DETAIL_PUBLIC: IItemTab<TTypeValue>[] = [
    {
        value: "",
        label: "Основная информация",
        icon: "/magazine/icons/grid-01.svg",
    },
    {
        value: "products",
        label: "Товары",
        icon: "/magazine/icons/package.svg",
    },
]
