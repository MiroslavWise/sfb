import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IProductRoot } from "@/types/types"

import { queryProductById } from "@/apollo/query"

export const MerchandiseId = () => {
    const productId = useSearchParams().get("product-id")

    const { data } = useQuery<IProductRoot>(queryProductById, {
        variables: { id: productId },
    })

    const { productById } = data ?? {}

    const photos = useMemo(() => {
        return productById?.photoListUrl || []
    }, [productById])

    return <></>
}
