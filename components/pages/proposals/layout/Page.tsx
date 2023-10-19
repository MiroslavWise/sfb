"use client"

import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IProductOfferListRoot } from "@/types/types"

import { ItemProposal } from "../components/ItemProposal"
import { HeaderMyProposals } from "../components/HeaderMyProposals"

import { queryProductOfferList } from "@/apollo/query-offers"
import { Filter } from "@/components/common/filters"

export default function PageProposals() {
    const productId = useSearchParams()?.get("request-id")
    const { data, loading } = useQuery<IProductOfferListRoot>(
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
            {/* <HeaderMyProposals /> */}
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
