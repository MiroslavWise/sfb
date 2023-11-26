"use client"

import { useSearchParams } from "next/navigation"

import { MerchandiseChangeId } from "@/components/pages/shop"

export default function MerchandiseChange() {
    const productId = useSearchParams().get("product-id")

    if (!productId) return null

    return <MerchandiseChangeId />
}
