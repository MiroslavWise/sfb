"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import type { IRequestProduct } from "@/types/types"

import { Filter } from "@/components/common/filters"
import { ItemRequestsPage } from "./ItemRequestsPage"

import { useTitle } from "@/helpers/hooks/useTitle"
import { productRequestListMe } from "@/apollo/query"

export function MyRequests() {
    const { data } = useQuery(productRequestListMe, {
        variables: { offset: 0 },
    })
    useTitle(`Мои запросы (${data?.productRequestListMe?.totalCount || 0})`)

    const list = useMemo(() => (data?.productRequestListMe?.results as any[]) || [], [data?.productRequestListMe])

    return (
        <>
            <header data-header-main>
                <Link data-create href={{ pathname: `/my-requests/new/change` }}>
                    <span>Создать</span>
                    <img src="/svg/plus-circle.svg" alt="plus" width={22} height={22} />
                </Link>
            </header>
            <Filter />
            <article>
                {list.map((item: IRequestProduct) => (
                    <ItemRequestsPage key={`${item.id}`} {...item} />
                ))}
            </article>
        </>
    )
}
