import { useMemo } from "react"
import { useQuery } from "@apollo/client"

import type { IProductList } from "@/types/types"

import { ItemProduct } from "./ItemProduct"

import { queryProductList } from "@/apollo/query"

export const ItemsProductQuery = ({ id }: { id: string }) => {
    const { data } = useQuery<IProductList>(queryProductList, {
        variables: { offset: 0, categoryId: id },
    })

    const listProducts = useMemo(() => {
        return data?.productList?.results! || []
    }, [data])

    return listProducts.map((item) => <ItemProduct key={`${item.id}`} {...item} />)
}
