import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { ICategoriesRoot, IProductList } from "@/types/types"

import { ItemMany } from "./ItemMany"
import { ItemProduct } from "./ItemProduct"

import { queryCategoriesRoot, queryProductList } from "@/apollo/query"

import styles from "../styles/catalog-many.module.scss"

export const CatalogMany = () => {
    const categoryId = useSearchParams().get("category-id")
    const { data } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { data: dataProductList } = useQuery<IProductList>(queryProductList, {
        variables: { offset: 1, categoryId: categoryId },
    })

    const list = useMemo(() => {
        return data?.categoryRootList! || []
    }, [data])

    const listProduct = useMemo(() => {
        return dataProductList?.productList?.results || []
    }, [dataProductList?.productList])

    return (
        <div className={styles.wrapper}>
            <aside>
                {list.map((item) => (
                    <ItemMany key={`${item.id}-!!key-aside`} {...item} />
                ))}
            </aside>
            <section>
                {listProduct.map((item) => (
                    <ItemProduct key={`${item.id}-product-id-==`} {...item} />
                ))}
            </section>
        </div>
    )
}
