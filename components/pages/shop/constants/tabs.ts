import type { IItemTab } from "@/components/common/tabs-details/types"

export type TTypeValue =
    | "basic-information"
    | "store-managers"
    | "merchandise"
    | "sales"
    | "delivery-of-goods"

export const TABS_SHOP_DETAIL: IItemTab<TTypeValue>[] = [
    {
        value: "basic-information",
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
