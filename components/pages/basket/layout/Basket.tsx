"use client"

import { useMemo } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { ICartList } from "@/types/shop"

import { ItemBasket } from "../components/ItemBasket"

import { queryCart } from "@/apollo/query-"

import styles from "../styles/list.module.scss"

export const BasketPage = () => {
    const { data } = useQuery<ICartList>(queryCart)
    // const [] = useMutation()

    const total = useMemo(() => {
        return data?.cart?.cartTotalSum || 0
    }, [data?.cart])

    return (
        <div className={styles.wrapper}>
            <ul>
                {data?.cart?.cartItemList?.map((item) => (
                    <ItemBasket key={`${item.id}----`} {...item} />
                ))}
            </ul>
            <aside>
                <div data-price>
                    <span>
                        <h1>Итого:</h1>
                        <h1>{+total?.toFixed()} ₸</h1>
                    </span>
                </div>
                <footer>
                    <button>
                        <span>Оплатить</span>
                    </button>
                </footer>
            </aside>
        </div>
    )
}
