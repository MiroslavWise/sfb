"use client"

import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IProductOfferListRoot } from "@/types/types"

import { HeaderMyProposals } from "@/components/pages/proposals"
import { FilterMain } from "@/components/pages/exchange/components/FilterMain"
import { ItemProposal } from "@/components/pages/proposals/components/ItemProposal"

import { queryProductOfferList } from "@/apollo/query-offers"

export default function Proposals() {
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
            <HeaderMyProposals />
            <div data-main-filter>
                <FilterMain label="Весь Казахстан" />
                <FilterMain label="Цена" />
            </div>
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
