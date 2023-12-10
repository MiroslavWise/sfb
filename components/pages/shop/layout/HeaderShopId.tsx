"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"

import type { IShopById } from "@/types/shop"

import { queryShopById } from "@/apollo/query-"

export const HeaderShopId = ({ id }: { id: string }) => {
    const { data } = useQuery<IShopById>(queryShopById, {
        variables: { shopId: id },
    })

    const name = useMemo(() => data?.shopById?.name || "", [data?.shopById?.name])

    return (
        <header data-header-name>
            <Link href={{ pathname: "/my-shop" }} data-back>
                <img src="/svg/arrow-left.svg" alt="chevron" width={24} height={24} />
            </Link>
            <h3>{name}</h3>
        </header>
    )
}
