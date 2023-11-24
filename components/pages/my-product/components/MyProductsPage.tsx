"use client"

import { useState } from "react"
import Image from "next/image"
import { useQuery } from "@apollo/client"

import { IProductOfferListRoot } from "@/types/types"

import { ItemProduct } from "./ItemProduct"
import { FilterProduct } from "./FilterProduct"
import { TabsDetails } from "@/components/common/tabs-details"
import { ItemProposal } from "../../proposals/components/ItemProposal"

import { useTitle } from "@/helpers/hooks/useTitle"
import { usePush } from "@/helpers/hooks/usePush"
import { queryProductListMe } from "@/apollo/query"
import { queryProductOfferList } from "@/apollo/query-offers"
import { ITEMS_TABS } from "@/app/(user)/(turnover)/my-products/constants"
import { useOrderingProduct } from "@/store/state/useOrderingProduct"

export function MyProductsPage() {
    const { price } = useOrderingProduct((_) => ({ price: _.price }))
    const { data } = useQuery(queryProductListMe, {
        variables: {
            ordering: price,
            offset: 0,
        },
    })
    useTitle(`Мои товары (${data?.productListMe?.totalCount || 0})`)
    const { data: dataOffers } = useQuery<IProductOfferListRoot>(
        queryProductOfferList,
    )
    const [loadingCreate, setLoadingCreate] = useState(false)
    const { handlePush } = usePush()
    const [tab, setTab] = useState(ITEMS_TABS[0])
    return (
        <>
            <header data-header-main>
                <button
                    data-create
                    onClick={() => {
                        setLoadingCreate(true)
                        handlePush(`/my-products/change`)
                    }}
                >
                    <span>Создать</span>
                    <Image
                        src="/svg/plus-circle.svg"
                        alt="plus"
                        width={22}
                        height={22}
                        data-loading={loadingCreate}
                    />
                </button>
            </header>
            <FilterProduct />
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
