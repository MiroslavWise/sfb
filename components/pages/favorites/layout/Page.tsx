import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import { ItemFavorite } from "../components/ItemFavorite"

import { queryFavoriteProductList } from "@/apollo/query"

import styles from "../styles/page.module.scss"

export const PageFavorites = () => {
    const { data } = useQuery(queryFavoriteProductList)
    const [idC, setIdC] = useState("")

    const list = useMemo(() => {
        return (data?.favoriteProductList?.results as any[]) || []
    }, [data?.favoriteProductList])

    const category = useMemo(() => {
        if (!list.length) return []

        const arrayC = list?.map((item) => item?.product?.category) as {
            id: string
            name: string
        }[]

        let arrays: { id: string; name: string }[] = []

        arrayC.forEach((item) => {
            if (!arrays.some((item_) => item_.id === item.id)) {
                arrays.push(item)
            }
        })

        return arrays
    }, [list])

    function handleCategory(id: string) {
        if (id === idC) {
            setIdC("")
        } else {
            setIdC(id)
        }
    }

    const filter = useMemo(() => {
        return (
            (list.filter((item) =>
                item?.product?.category?.id?.includes(idC),
            ) as any[]) || []
        )
    }, [list, idC])

    return (
        <div className={styles.wrapper}>
            <aside>
                <ul>
                    {category.map((item) => (
                        <li
                            key={`${item.id}---`}
                            onClick={() => {
                                handleCategory(item.id)
                            }}
                            data-is-active={idC === item.id}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </aside>
            <ul>
                {filter.map((item) => (
                    <ItemFavorite key={`${item?.id}`} {...item?.product} />
                ))}
            </ul>
        </div>
    )
}
