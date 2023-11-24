import { useState } from "react"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { Sales } from "../modules/sales"
import { Merchandise } from "../modules/merchandise"
import { StoreManagers } from "../modules/store-managers"
import { BasicInformation } from "../modules/basic-information"
import { DeliveryOfGoods } from "../modules/delivery-of-goods"
import { TabsDetails } from "@/components/common/tabs-details"

import { TABS_SHOP_DETAIL, type TTypeValue } from "../constants/tabs"

import styles from "../styles/uuid-watch.module.scss"

export const ShopUUIDPage = () => {
    const [current, setCurrent] = useState<IItemTab<TTypeValue>>(
        TABS_SHOP_DETAIL[0],
    )

    return (
        <div className={styles.wrapper}>
            <TabsDetails
                items={TABS_SHOP_DETAIL}
                current={current}
                set={setCurrent}
            />
            {current?.value === "basic-information" ? (
                <BasicInformation />
            ) : current.value === "store-managers" ? (
                <StoreManagers />
            ) : current.value === "merchandise" ? (
                <Merchandise />
            ) : current.value === "sales" ? (
                <Sales
                    set={(value) => {
                        const d = TABS_SHOP_DETAIL.find(
                            (item) => item.value === value,
                        )!
                        setCurrent(d)
                    }}
                />
            ) : current.value === "delivery-of-goods" ? (
                <DeliveryOfGoods />
            ) : null}
        </div>
    )
}
