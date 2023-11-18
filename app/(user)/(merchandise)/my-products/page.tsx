"use client"

import {
    MyProductPageUUID,
    MyProductsPage,
} from "@/components/pages/my-product"
import { useSearchParams } from "next/navigation"

export default function PAGE_MY_PRODUCT() {
    const uuid = useSearchParams().get("product-id")

    if (uuid) return <MyProductPageUUID />
    return <MyProductsPage />
}
