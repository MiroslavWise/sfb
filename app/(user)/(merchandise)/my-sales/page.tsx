"use client"

import { IItemTab } from "@/components/common/tabs-details/types"

import { TabsDetails } from "@/components/common/tabs-details"

import styles from "./page.module.scss"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { queryProductListMe } from "@/apollo/query"
import { ItemProduct } from "@/components/pages/my-product/components/ItemProduct"

const TABS: IItemTab[] = [
    {
        label: "Текущие",
        value: "current",
        icon: "/svg/profile/hourglass-03.svg",
    },
    {
        label: "Завершённые",
        value: "completed",
        icon: "/svg/profile/package-check.svg",
    },
]

export default function MySales() {
    const [value, setValue] = useState(TABS[0])
    const { data } = useQuery(queryProductListMe)

    return (
        <div className={styles.wrapper}>
            <h4>Товары, которые были проданы мной</h4>
            <TabsDetails items={TABS} set={setValue} current={value} />
            <ul>
                {data?.productListMe?.results
                    ?.filter((item: any) => !item?.draft)
                    ?.map((item: any) => (
                        <ItemProduct key={`${item?.id}`} {...item} />
                    ))}
            </ul>
        </div>
    )
}
