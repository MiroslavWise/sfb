"use client"

import { useQuery } from "@apollo/client"
import type { IRequestProduct } from "../types/types"

import { ItemRequestsPage } from "./ItemRequestsPage"

import { productRequestListMe } from "@/apollo/query"

export function MyRequestsPage() {
    const { data, loading } = useQuery(productRequestListMe, {
        variables: { offset: 0 },
    })

    if (loading) return <></>

    return (
        <article>
            {Array.isArray(data?.productRequestListMe?.results)
                ? data?.productRequestListMe?.results?.map(
                      (item: IRequestProduct) => (
                          <ItemRequestsPage key={`${item.id}`} {...item} />
                      ),
                  )
                : null}
        </article>
    )
}
