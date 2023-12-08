import dayjs from "dayjs"
import Link from "next/link"
import { type FC } from "react"
import Image from "next/image"

import type { IProduct } from "@/types/types"

import { ButtonAddCart } from "@/components/common/button-add-cart"

import { useAuth } from "@/store/state/useAuth"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"

import styles from "../styles/item-product.module.scss"

export const ItemProduct: FC<IProduct> = (props) => {
    const token = useAuth(({ token }) => token)
    const { photoListUrl, price, name, city, createdAt, id, shop } = props ?? {}
    const { isFavorite, handleFavorite, loading } = useFavoritesClick()

    function handle() {
        handleFavorite(id)
    }

    const is = isFavorite(id!)

    return (
        <Link
            href={{
                pathname: `/product/${id}`,
            }}
            className={styles.container}
        >
            {photoListUrl[0] ? (
                <Image src={photoListUrl[0]?.photoUrl!} alt="photo" width={200} height={200} unoptimized />
            ) : (
                <div data-img>
                    <p>Фотографий нет</p>
                </div>
            )}
            {shop?.id ? (
                <div data-is-verification>
                    <p>Качество</p>
                </div>
            ) : null}
            <div data-title>
                <h3>{Number(price)?.toFixed(0) || 0} ₸</h3>
                <div data-add>
                    {token ? (
                        <div
                            data-loading={loading}
                            data-favorite
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                handle()
                            }}
                        >
                            <img src={is ? "/svg/heart-fill.svg" : "/svg/heart.svg"} alt="tag--" width={24} height={24} />
                        </div>
                    ) : null}
                    <ButtonAddCart id={id} int={1} />
                </div>
            </div>

            <h5>{name}</h5>
            <a data-city>{city?.name}</a>
            <div data-time>
                <img src="/svg/calendar-date.svg" alt="calendar" width={12} height={12} />
                <a>{dayjs(createdAt).format("HH:mm DD.MM.YY")}</a>
            </div>
        </Link>
    )
}
