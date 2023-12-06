"use client"

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
            <h3>{name}</h3>
        </header>
    )
}
