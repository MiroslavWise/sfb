"use client"

import { useState } from "react"
import { useQuery } from "@apollo/client"

import { IItemTab } from "@/components/common/tabs-details/types"

import { TabsDetails } from "@/components/common/tabs-details"
import { ItemProduct } from "@/components/pages/my-product/components/ItemProduct"

import { queryProductList } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"

import styles from "./page.module.scss"

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

export default function MyOrders() {
    const user = useAuth(({ user }) => user)
    const [value, setValue] = useState(TABS[0])

    const { data } = useQuery(queryProductList)

    return (
        <div className={styles.wrapper}>
            <h4>Товары, которые были куплены мной</h4>
            <TabsDetails items={TABS} set={setValue} current={value} />
            <ul>
                {data?.productList?.results
                    ?.filter(
                        (item: any) =>
                            !item?.draft && user?.id !== item?.author?.id,
                    )
                    ?.map((item: any) => (
                        <ItemProduct key={`${item?.id}`} {...item} />
                    ))}
            </ul>
        </div>
    )
}
