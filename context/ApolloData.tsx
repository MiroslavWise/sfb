"use client"

import { useEffect } from "react"
import { useQuery } from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { queryFavoriteProductList } from "@/apollo/query"
import { dispatchFavorites } from "@/store/state/useFavorites"

export const ApolloData = ({ children }: IChildrenProps) => {
    const token = useAuth(({ token }) => token)
    const { refetch } = useQuery(queryFavoriteProductList)

    useEffect(() => {
        if (!!token) {
            requestAnimationFrame(() => {
                refetch().then((response) => {
                    if (response?.data) {
                        const array = response?.data?.favoriteProductList?.results
                        if (Array.isArray(array)) {
                            const results = array?.map((item: any) => ({
                                id: item?.id,
                                productId: item?.product?.id!,
                            }))
                            dispatchFavorites({
                                all: results,
                            })
                        }
                    }
                })
            })
        }
    }, [token])

    return children
}
