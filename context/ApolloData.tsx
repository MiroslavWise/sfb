"use client"

import { useEffect } from "react"
import { useQuery } from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { dispatchFavorites } from "@/store/state/useFavorites"
import { queryFavoriteProductList } from "@/apollo/query"

export const ApolloData = ({ children }: IChildrenProps) => {
    const token = useAuth(({ token }) => token)
    const { refetch } = useQuery(queryFavoriteProductList)

    useEffect(() => {
        if (!!token) {
            refetch().then((response) => {
                if (response?.data) {
                    if (Array.isArray(response?.data?.favoriteProductList?.results)) {
                        const results = response?.data?.favoriteProductList?.results?.map((item: any) => ({
                            id: item?.id,
                            productId: item?.product?.id!,
                        }))
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
