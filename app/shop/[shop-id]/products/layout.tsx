import type { Metadata } from "next"
import type { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Товары и услуги магазина",
    description: "Товары и услуги магазина",
}

export default function LayoutShopProducts({ children }: IChildrenProps) {
    return children
}
