"use client"

import { useMemo } from "react"
import { useQuery } from "@apollo/client"

import type { IProductList } from "@/types/types"

import { ItemPublicProductsId } from "../components/ItemPublicProductsId"

import { queryProductListShopId } from "@/apollo/query"

import styles from "../styles/public-products-id.module.scss"

export const PublicProductsId = ({ id }: { id: string }) => {
    const { data } = useQuery<IProductList>(queryProductListShopId, { variables: { shopId: id } }) 

    const list = useMemo(() => {
        return data?.productList?.results || []
    }, [data?.productList?.results])

    return (
        <div className={styles.wrapper}>
            {list.map((item) => (
                <ItemPublicProductsId key={`${item.id}-shop-`} {...item} /> 
            ))}
        </div>
    )
}
