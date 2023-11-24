import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import { ItemFavorite } from "../components/ItemFavorite"

import { queryFavoriteProductList } from "@/apollo/query"

import styles from "../styles/page.module.scss"
import Image from "next/image"
import Link from "next/link"

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
            {list?.length === 0 ? (
                <div data-empty>
                    <img
                        src="/svg/tag-01.svg"
                        alt="tag-01"
                        width={200}
                        height={200}
                    />
                    <div data-info>
                        <h3>Ваш список желаемого пуст</h3>
                        <p>
                            Вы можете добавлять сюда понравившиеся вам товары и
                            обсуждать их с друзьями, а так-же отсюда вы можете
                            поместить товар в корзину и купить его
                        </p>
                        <p>
                            Что-бы добавить товары в избранное, перейдите в{" "}
                            <Link href={"/market"}>каталог</Link>, и выбирите
                            понравившиеся вам товары
                        </p>
                    </div>
                </div>
            ) : (
                <>
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
                            <ItemFavorite
                                key={`${item?.id}`}
                                {...item?.product}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}
