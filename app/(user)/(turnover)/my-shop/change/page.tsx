"use client"

import { useSearchParams } from "next/navigation"

import { ChangeShop } from "@/components/pages/shop/components/Change"

export default function ShopChange() {
    const id = useSearchParams().get("id")

    if (id) return <ChangeShop />
    return null
}
