"use client"

import { useEffect } from "react"
import { useLazyQuery } from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { useFavorites } from "@/store/state/useFavorites"
import { queryFavoriteProductList } from "@/apollo/query"

export const ApolloData = ({ children }: IChildrenProps) => {
    const { token } = useAuth((_) => ({
        token: _.token,
    }))
    const { dispatchFavorites } = useFavorites((_) => ({
        dispatchFavorites: _.dispatchFavorites,
    }))
    const [lazyFavorites] = useLazyQuery(queryFavoriteProductList)

    useEffect(() => {
        if (!!token) {
            lazyFavorites().then((response) => {
                if (response?.data) {
                    if (
                        Array.isArray(
                            response?.data?.favoriteProductList?.results,
                        )
                    ) {
                        const results =
                            response?.data?.favoriteProductList?.results?.map(
                                (item: any) => ({
                                    id: item?.id,
                                    productId: item?.product?.id!,
                                }),
                            )
                        dispatchFavorites({
                            all: results,
                        })
                    }
                }
            })
        }
    }, [token])

    return children
}
