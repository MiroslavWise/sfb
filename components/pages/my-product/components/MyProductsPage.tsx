"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@apollo/client"

import { IProductOfferListRoot } from "@/types/types"

import { ItemProduct } from "./ItemProduct"
import { FilterProduct } from "./FilterProduct"
import { TabsDetails } from "@/components/common/tabs-details"
import { ItemProposal } from "../../proposals/components/ItemProposal"

import { useTitle } from "@/helpers/hooks/useTitle"
import { queryProductOfferList } from "@/apollo/query-offers"
import { useOrderingProduct } from "@/store/state/useOrderingProduct"
import { ITEMS_TABS } from "@/app/(user)/(turnover)/my-products/constants"
import { queryProductListMe, queryProductListMeArchive } from "@/apollo/query"

export function MyProductsPage() {
    const price = useOrderingProduct(({ price }) => price)
    const { data } = useQuery(queryProductListMe, {
        variables: {
            ordering: price,
            offset: 0,
        },
    })
    const { data: dataArchive } = useQuery(queryProductListMeArchive, {
        variables: {
            ordering: price,
            offset: 0,
        },
    })
    useTitle(`Мои товары (${data?.productListMe?.totalCount || 0})`)
    const { data: dataOffers } = useQuery<IProductOfferListRoot>(queryProductOfferList)
    const [tab, setTab] = useState(ITEMS_TABS[0])
    return (
        <>
            <header data-header-main>
                <Link data-create href={{ pathname: `/my-products/new/change` }}>
                    <span>Создать</span>
                    <img src="/svg/plus-circle.svg" alt="plus" width={22} height={22} />
                </Link>
            </header>
            <FilterProduct />
            <TabsDetails items={ITEMS_TABS} current={tab} set={setTab} />
            <article>
                {Array.isArray(data?.productListMe?.results) && tab.value === "main"
                    ? data?.productListMe?.results?.map((item: any) => <ItemProduct key={`${item.id}-product`} {...item} />)
                    : Array.isArray(dataArchive?.productListMe?.results) && tab.value === "archive"
                    ? dataArchive?.productListMe?.results?.map((item: any) => <ItemProduct key={`${item.id}-archive`} {...item} />)
                    : Array.isArray(dataOffers?.productOfferList?.results) && tab.value === "proposals"
                    ? dataOffers?.productOfferList?.results?.map((item) => <ItemProposal key={`${item.id}-key---`} {...item} />)
                    : null}
            </article>
        </>
    )
}
