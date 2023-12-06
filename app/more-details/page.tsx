"use client"

import { useSearchParams } from "next/navigation"

import { RequestId } from "@/components/pages/more-details"

export default function MoreDetails() {
    const searchParams = useSearchParams()
    const requestId = searchParams.get("request-id")

    if (requestId) return <RequestId />

    return null
}
