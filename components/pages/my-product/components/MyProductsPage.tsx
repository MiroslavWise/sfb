"use client"

import { useQuery } from "@apollo/client"

import { queryProductListMe } from "@/apollo/query"
import { ItemProduct } from "./ItemProduct"

export function MyProductsPage() {
    const { data } = useQuery(queryProductListMe)
    console.log("queryProductListMe ", data)

    return (
        <>
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
