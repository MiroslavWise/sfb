"use client"

import { useQuery } from "@apollo/client"
import type { IRequestProduct } from "@/types/types"

import { ItemRequestsPage } from "./ItemRequestsPage"

import { productRequestListMe } from "@/apollo/query"
import { usePush } from "@/helpers/hooks/usePush"
import { Filter } from "@/components/common/filters"
import Image from "next/image"

export function MyRequestsPage() {
    const { data, loading } = useQuery(productRequestListMe, {
        variables: { offset: 0 },
    })
    const { handlePush } = usePush()

    if (loading) return <></>

    return (
        <>
            <header data-header-main>
                <button
                    data-create
                    onClick={() => {
                        handlePush(`/my-requests/change`)
                    }}
                >
                    <span>Создать</span>
                    <Image
                        src="/svg/plus-circle.svg"
                        alt="plus"
                        width={22}
                        height={22}
                    />
                </button>
            </header>
            <Filter />
            <article>
                {Array.isArray(data?.productRequestListMe?.results)
                    ? data?.productRequestListMe?.results?.map(
                          (item: IRequestProduct) => (
                              <ItemRequestsPage key={`${item.id}`} {...item} />
                          ),
                      )
                    : null}
            </article>
        </>
    )
}
