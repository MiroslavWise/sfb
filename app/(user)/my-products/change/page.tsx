"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { MyProductPageChange } from "@/components/pages/my-product/components/MyProductPageChange"

import { usePush } from "@/helpers/hooks/usePush"

export default function PAGE_MY_PRODUCT_CHANGE() {
    const uuid = useSearchParams().get("product-id")
    const { handleReplace } = usePush()

    useEffect(() => {
        if (!uuid) {
            handleReplace("/my-products")
        }
    }, [uuid])

    if (!uuid) return <></>

    return <MyProductPageChange />
}
