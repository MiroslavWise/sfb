"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import type { ICartList } from "@/types/shop"

import { ItemBasket } from "../components/ItemBasket"

import { queryCart } from "@/apollo/query-"

import styles from "../styles/list.module.scss"

export const BasketPage = () => {
    const [isTerms, setIsTerms] = useState(false)
    const { data } = useQuery<ICartList>(queryCart)

    const total = useMemo(() => {
        return data?.cart?.cartTotalSum || 0
    }, [data?.cart])

    return (
        <div className={styles.wrapper}>
            {data?.cart?.cartItemList?.length === 0 ? (
                <div data-empty>
                    <img src="/svg/shopping-cart-01.svg" alt="shopping-cart" width={200} height={200} />
                    <div data-info>
                        <h3>Ваша корзина пуста</h3>
                        <p>
                            Вы можете перейти в <Link href={"/market"}>каталог</Link> или в <Link href={"/favorites"}>избранное</Link>,
                            откуда вы можете добавить товары для оплаты
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <section>
                        <ul>
                            {data?.cart?.cartItemList?.map((item) => (
                                <ItemBasket key={`${item.id}----`} {...item} />
                            ))}
                        </ul>
                        <footer>
                            <div data-header>
                                <h2>Способ доставки</h2>
                                <p>
                                    <Link href={"/profile/change-data"}>Добавьте </Link> адреса доставки в вашем личном кабинете
                                </p>
                            </div>
                            <div data-footer>
                                <div data-item>
                                    <h2>Способ оплаты</h2>
                                    <p>
                                        У вас нет методов оплаты, <Link href="/profile/change-payment">добавьте</Link> их в личном кабинете
                                    </p>
                                </div>
                                <div data-item>
                                    <h2>Мои данные</h2>
                                    <p>
                                        У вас не достаточно информации, что-бы с вами связаться{" "}
                                        <Link href="/profile/change-payment">дополните</Link> их в личном кабинете
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </section>
                    <aside>
                        <header>
                            <a>Выбрать адрес доставки</a>
                        </header>
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
                            <div data-terms data-active={isTerms} onClick={() => setIsTerms((_) => !_)}>
                                <div data-is>
                                    <div />
                                </div>
                                <p>
                                    Соглашаюсь с <span>правилами пользования торговой площадкой</span> и <span>возврата</span>
                                </p>
                            </div>
                        </footer>
                    </aside>
                </>
            )}
        </div>
    )
}
