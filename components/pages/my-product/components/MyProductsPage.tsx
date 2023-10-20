"use client"

import { useQuery } from "@apollo/client"

import { queryProductListMe } from "@/apollo/query"
import { ItemProduct } from "./ItemProduct"
import { usePush } from "@/helpers/hooks/usePush"
import { Filter } from "@/components/common/filters"

export function MyProductsPage() {
    const { data } = useQuery(queryProductListMe)
    const { handlePush } = usePush()

    return (
        <>
            <header data-header-main>
                <button
                    data-create
                    onClick={() => {
                        handlePush(`/my-products/change`)
                    }}
                >
                    <span>Создать</span>
                </button>
            </header>
            <Filter />
            <article>
                {Array.isArray(data?.productListMe?.results)
                    ? data?.productListMe?.results?.map((item: any) => (
                          <ItemProduct key={`${item.id}-product`} {...item} />
                      ))
                    : null}
            </article>
        </>
    )
}
