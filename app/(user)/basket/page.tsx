"use client"

import { useSearchParams } from "next/navigation"

import { BasketPage } from "@/components/pages/basket"

import { useTitle } from "@/helpers/hooks/useTitle"

export default function Basket() {
    const id = useSearchParams().get("id")
    useTitle("Корзина")

    return <BasketPage />
}
