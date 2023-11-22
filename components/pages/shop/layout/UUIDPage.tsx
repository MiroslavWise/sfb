import Image from "next/image"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IShopById } from "@/types/shop"

import { queryShopById } from "@/apollo/query-"

import styles from "../styles/uuid-watch.module.scss"

export const ShopUUIDPage = () => {
    const id = useSearchParams().get("id")
    const { data } = useQuery<IShopById>(queryShopById, {
        variables: { shopId: id },
    })

    return (
        <div className={styles.wrapper}>
            <h3>Информация о магазине</h3>
            {data?.shopById?.photoUrl ? (
                <Image
                    src={data?.shopById?.photoUrl!}
                    alt="photo"
                    width={250}
                    height={250}
                    unoptimized
                />
            ) : null}
            <div data-set>
                <label>Название:</label>
                <p>{data?.shopById?.name}</p>
            </div>
            <div data-set>
                <label>Описание:</label>
                <p>{data?.shopById?.description}</p>
            </div>
            <div data-set>
                <label>Адрес:</label>
                <p>{data?.shopById?.address}</p>
            </div>
        </div>
    )
}
