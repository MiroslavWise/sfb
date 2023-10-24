"use client"

import { IItemTab } from "@/components/common/tabs-details/types"

import { TabsDetails } from "@/components/common/tabs-details"

import styles from "./page.module.scss"
import { useState } from "react"

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
    const [value, setValue] = useState(TABS[0])

    return (
        <div className={styles.wrapper}>
            <TabsDetails items={TABS} set={setValue} current={value} />
        </div>
    )
}
