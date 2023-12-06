import type { Metadata } from "next"

import { BasketPage } from "@/components/pages/basket"

export const metadata: Metadata = {
    title: "SFB - Корзина",
    description: "Товары, которые находятся у вас в корзине",
}

export default function Basket() {
    return <BasketPage />
}
