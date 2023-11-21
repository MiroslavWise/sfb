import { useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"

import { useFavorites } from "@/store/state/useFavorites"
import {
    mutationFavoriteProductAdd,
    mutationFavoriteProductDelete,
} from "@/apollo/mutation"
import { queryFavoriteProductList } from "@/apollo/query"

export const useFavoritesClick = () => {
    const [loading, setLoading] = useState(false)
    const [add] = useMutation(mutationFavoriteProductAdd)
    const [use, { refetch }] = useLazyQuery(queryFavoriteProductList)
    const [deleteProduct] = useMutation(mutationFavoriteProductDelete)

    const { favorites, dispatchFavorites } = useFavorites()

    function handleFavorite(value: string) {
        setLoading(true)
        if (favorites.some((item) => item.productId === value)) {
            const favoriteId = favorites.find(
                (item) => item.productId === value,
            )?.id

            deleteProduct({
                variables: {
                    favoriteId: favoriteId,
                },
            })
                .then((response) => {
                    if (response?.data?.favoriteProductDelete?.ok) {
                        refetch()
                        dispatchFavorites({
                            remove: favoriteId,
                        })
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            add({
                variables: {
                    productId: value,
                },
            })
                .then((response) => {
                    if (response?.data?.favoriteProductAdd?.ok) {
                        const data =
                            response?.data?.favoriteProductAdd?.favorite
                        refetch()
                        dispatchFavorites({
                            add: {
                                id: data?.id!,
                                productId: data?.product?.id!,
                            },
                        })
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    function isFavorite(value: string) {
        return favorites.some((item) => item.productId === value)
    }

    return {
        handleFavorite,
        loading,
        isFavorite,
    }
}
