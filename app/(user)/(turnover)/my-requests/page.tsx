"use client"

import { useSearchParams } from "next/navigation"

import {
    MyRequestsPageUUID,
    MyRequestsPage,
} from "@/components/pages/my-requests"

export default function PAGE_MY_REQUEST() {
    const uuid = useSearchParams().get("request-id")
    if (uuid) return <MyRequestsPageUUID />
    return <MyRequestsPage />
}
