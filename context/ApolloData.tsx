"use client"

import { useEffect } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { dispatchFavorites } from "@/store/state/useFavorites"
import { me, queryFavoriteProductList } from "@/apollo/query"

export const ApolloData = ({ children }: IChildrenProps) => {
    const token = useAuth(({ token }) => token)
    const { refetch } = useQuery(queryFavoriteProductList)

    const [useProfile, { refetch: refetchProfile }] = useLazyQuery(me)

    useEffect(() => {
        if (token) {
            refetchProfile()
        }
    }, [token])

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
