"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { ICartList, IDeliveryMethodList } from "@/types/shop"

import { ItemBasket } from "../components/ItemBasket"

import { queryCart, queryDeliveryMethodList } from "@/apollo/query-"

import styles from "../styles/list.module.scss"
import Image from "next/image"

export const BasketPage = () => {
    const { data } = useQuery<ICartList>(queryCart)
    const { data: dataDeliveryMethod } = useQuery<IDeliveryMethodList>(
        queryDeliveryMethodList,
    )

    const total = useMemo(() => {
        return data?.cart?.cartTotalSum || 0
    }, [data?.cart])

    return (
        <div className={styles.wrapper}>
            {data?.cart?.cartItemList?.length === 0 ? (
                <div data-empty>
                    <img
                        src="/svg/shopping-cart-01.svg"
                        alt="shopping-cart"
                        width={200}
                        height={200}
                    />
                    <div data-info>
                        <h3>Ваша корзина пуста</h3>
                        <p>
                            Вы можете перейти в{" "}
                            <Link href={"/market"}>каталог</Link> или в{" "}
                            <Link href={"/favorites"}>избранное</Link>, откуда
                            вы можете добавить товары для оплаты
                        </p>
                    </div>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}
