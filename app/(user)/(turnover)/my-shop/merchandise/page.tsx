"use client"

import { useSearchParams } from "next/navigation"

import { MerchandiseId } from "@/components/pages/shop"

export default function Merchandise() {
    const productId = useSearchParams().get("product-id")

    if (!productId) return null

    return <MerchandiseId />
}
