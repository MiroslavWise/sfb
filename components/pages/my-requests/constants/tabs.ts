import { IItemTab } from "@/components/common/tabs-details/types"

export const ITEMS_TABS: IItemTab[] = [
    {
        label: "Описание и фото",
        value: "main",
        icon: "/svg/tabs/main.svg",
    },
    {
        label: "Предложения продавцов",
        value: "proposals",
        icon: "/svg/tabs/proposals.svg",
    },
    {
        label: "Отзывы",
        value: "testimonials",
        icon: "/svg/tabs/testimonials.svg",
    },
]
