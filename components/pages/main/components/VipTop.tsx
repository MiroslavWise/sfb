"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"

import type { IProductList } from "@/types/types"

import { queryTop10Vip } from "@/apollo/query-"

import { usePush } from "@/helpers/hooks/usePush"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"

import styles from "../styles/vip-top.module.scss"
import dayjs from "dayjs"
import { useAuth } from "@/store/state/useAuth"
import { ButtonAddCart } from "@/components/common/button-add-cart"

export const VipTop = () => {
    const isAuth = useAuth(({ token }) => !!token)
    const { data } = useQuery<IProductList>(queryTop10Vip)
    const { isFavorite, handleFavorite, loading } = useFavoritesClick()
    const { handlePush } = usePush()

    function handle(id: string) {
        handleFavorite(id)
    }

    return (
        <section className={styles.wrapper}>
            <h3>VIP товары</h3>
            <ul>
                {data?.productList &&
                    data?.productList?.results?.map((item) => (
                        <li
                            key={`${item.id}-vip`}
                            onClick={() => {
                                handlePush(`/more-details?product-id=${item}`)
                            }}
                        >
                            {item?.photoListUrl[0] ? (
                                <Image src={item?.photoListUrl[0]?.photoUrl!} alt="photo" width={200} height={200} unoptimized />
                            ) : (
                                <div data-img>
                                    <p>Фотографий нет</p>
                                </div>
                            )}
                            <div data-is-verification>
                                <p>VIP</p>
                            </div>
                            <h3>{Number(item?.price)?.toFixed(0) || 0} ₸</h3>
                            <h5>{item?.name}</h5>
                            <a data-city>{item?.city?.name}</a>
                            <div data-time>
                                <img src="/svg/calendar-date.svg" alt="calendar" width={12} height={12} />
                                <a>{dayjs(item?.createdAt).format("HH:mm DD.MM.YY")}</a>
                            </div>
                            <div data-add>
                                {isAuth ? (
                                    <div
                                        data-loading={loading}
                                        data-favorite
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            event.preventDefault()
                                            handle(item?.id)
                                        }}
                                    >
                                        <img
                                            src={isFavorite(item?.id!) ? "/svg/heart-fill.svg" : "/svg/heart.svg"}
                                            alt="--heart--"
                                            width={25}
                                            height={25}
                                        />
                                    </div>
                                ) : null}
                                <ButtonAddCart id={item?.id} int={1} />
                            </div>
                        </li>
                    ))}
            </ul>
        </section>
    )
}
