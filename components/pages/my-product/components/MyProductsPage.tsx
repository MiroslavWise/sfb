"use client"

import { useState } from "react"
import { useQuery } from "@apollo/client"

import { IProductOfferListRoot } from "@/types/types"

import { ItemProduct } from "./ItemProduct"
import { Filter } from "@/components/common/filters"
import { TabsDetails } from "@/components/common/tabs-details"

import { usePush } from "@/helpers/hooks/usePush"
import { queryProductListMe } from "@/apollo/query"
import { queryProductOfferList } from "@/apollo/query-offers"
import { ITEMS_TABS } from "@/app/(user)/my-products/constants"
import { ItemProposal } from "../../proposals/components/ItemProposal"
import Image from "next/image"

export function MyProductsPage() {
    const { data } = useQuery(queryProductListMe)
    const { data: dataOffers } = useQuery<IProductOfferListRoot>(
        queryProductOfferList,
    )
    const { handlePush } = usePush()
    const [tab, setTab] = useState(ITEMS_TABS[0])
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
                    <Image
                        src="/svg/plus-circle.svg"
                        alt="plus"
                        width={22}
                        height={22}
                    />
                </button>
            </header>
            <Filter />
            <TabsDetails items={ITEMS_TABS} current={tab} set={setTab} />
            <article>
                {Array.isArray(data?.productListMe?.results) &&
                tab.value === "main"
                    ? data?.productListMe?.results?.map((item: any) => (
                          <ItemProduct key={`${item.id}-product`} {...item} />
                      ))
                    : Array.isArray(dataOffers?.productOfferList?.results) &&
                      tab.value === "proposals"
                    ? dataOffers?.productOfferList?.results?.map((item) => (
                          <ItemProposal key={`${item.id}-key---`} {...item} />
                      ))
                    : null}
            </article>
        </>
    )
}
