"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"
import type { IRequestProduct } from "@/types/types"

import { Filter } from "@/components/common/filters"
import { ItemRequestsPage } from "./ItemRequestsPage"

import { useTitle } from "@/helpers/hooks/useTitle"
import { usePush } from "@/helpers/hooks/usePush"
import { productRequestListMe } from "@/apollo/query"

export function MyRequests() {
    const { data } = useQuery(productRequestListMe, {
        variables: { offset: 0 },
    })
    useTitle(`Мои запросы (${data?.productRequestListMe?.totalCount || 0})`)
    const { handlePush } = usePush()
    const [loadingCreate, setLoadingCreate] = useState(false)

    const list = useMemo(() => (data?.productRequestListMe?.results as any[]) || [], [data?.productRequestListMe])

    return (
        <>
            <header data-header-main>
                <button
                    data-create
                    onClick={() => {
                        setLoadingCreate(true)
                        handlePush(`/my-requests/new/change`)
                    }}
                >
                    <span>Создать</span>
                    <img src="/svg/plus-circle.svg" alt="plus" width={22} height={22} data-loading={loadingCreate} />
                </button>
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
