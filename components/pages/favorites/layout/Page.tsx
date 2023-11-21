import { useMemo } from "react"
import { useQuery } from "@apollo/client"

import { queryFavoriteProductList } from "@/apollo/query"

import styles from "../styles/page.module.scss"
import { ItemFavorite } from "../components/ItemFavorite"

export const PageFavorites = () => {
    const { data } = useQuery(queryFavoriteProductList)

    const list = useMemo(() => {
        return (data?.favoriteProductList?.results as any[]) || []
    }, [data?.favoriteProductList])

    return (
        <div className={styles.wrapper}>
            <ul>
                {list.map((item) => (
                    <ItemFavorite key={`${item?.id}`} {...item?.product} />
                ))}
            </ul>
        </div>
    )
}
