"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers/hooks/usePush"
import { MyRequestsPageChange } from "@/components/pages/my-requests/components/MyRequestsPageChange"

export default function PAGE_MY_REQUEST_CHANGE() {
    const uuid = useSearchParams().get("request-id")
    const { handleReplace } = usePush()

    useEffect(() => {
        if (!uuid) {
            handleReplace("/my-requests")
        }
    }, [uuid])

    if (!uuid) return <></>

    return <MyRequestsPageChange />
}
