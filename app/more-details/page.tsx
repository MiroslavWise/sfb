"use client"

import { useSearchParams } from "next/navigation"

import { ProductId, RequestId } from "@/components/pages/more-details"

export default function MoreDetails() {
    const searchParams = useSearchParams()
    const productId = searchParams.get("product-id")
    const requestId = searchParams.get("request-id")

    if (productId) return <ProductId />
    if (requestId) return <RequestId />

    return null
}
