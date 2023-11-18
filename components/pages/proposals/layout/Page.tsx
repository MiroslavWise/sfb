"use client"

import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IProductOfferListRoot } from "@/types/types"

import { ItemProposal } from "../components/ItemProposal"

import { queryProductOfferList } from "@/apollo/query-offers"
import { Filter } from "@/components/common/filters"

export function PageProposals() {
    const productId = useSearchParams()?.get("request-id")
    const { data } = useQuery<IProductOfferListRoot>(
        queryProductOfferList,
        {
            variables: {
                product_Id: productId || null,
            },
        },
    )

    const { productOfferList } = data ?? {}

    return (
        <>
            <Filter />
            <article>
                {Array.isArray(productOfferList?.results)
                    ? productOfferList?.results?.map((item) => (
                          <ItemProposal
                              key={`${item.id}-proposals`}
                              {...item}
                          />
                      ))
                    : null}
            </article>
        </>
    )
}
