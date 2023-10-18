"use client"

import { useQuery } from "@apollo/client"

import { queryProductOfferList } from "@/apollo/query-offers"
import { HeaderMyProposals } from "@/components/pages/proposals"
import { IProductOfferListRoot } from "@/types/types"
import { ItemProposal } from "@/components/pages/proposals/components/ItemProposal"
import { useSearchParams } from "next/navigation"

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
