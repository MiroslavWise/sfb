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
        // icon: "",
    },
    {
        value: "store-managers",
        label: "Менеджеры магазина",
        // icon: "",
    },
    {
        value: "merchandise",
        label: "Товары",
        // icon: "",
    },
    {
        value: "sales",
        label: "Продажи",
        // icon: "",
    },
    {
        value: "delivery-of-goods",
        label: "Доставки товаров",
        // icon: "",
    },
]
