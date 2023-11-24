import dayjs from "dayjs"
import Image from "next/image"
import { type FC } from "react"

import type { IProduct } from "@/types/types"

import { ButtonAddCart } from "@/components/common/button-add-cart"

import { usePush } from "@/helpers/hooks/usePush"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { useAuth } from "@/store/state/useAuth"

export const ItemProduct: FC<IProduct> = (props) => {
    const { token } = useAuth((_) => ({ token: _.token }))
    const { photoListUrl, price, name, city, createdAt, id } = props ?? {}
    const { handlePush } = usePush()
    const { isFavorite, handleFavorite, loading } = useFavoritesClick()

    function handle() {
        handleFavorite(id)
    }

    return (
        <li
            onClick={() => {
                handlePush(`/more-details?product-id=${id}`)
            }}
        >
            {photoListUrl[0] ? (
                <Image
                    src={photoListUrl[0]?.photoUrl!}
                    alt="photo"
                    width={200}
                    height={200}
                />
            ) : (
                <div data-img>
                    <p>Фотографий нет</p>
                </div>
            )}
            <h3>{Number(price)?.toFixed(0) || 0} ₸</h3>
            <h5>{name}</h5>
            <a data-city>{city?.name}</a>
            <div data-time>
                <img
                    src="/svg/calendar-date.svg"
                    alt="calendar"
                    width={12}
                    height={12}
                />
                <a>{dayjs(createdAt).format("HH:mm DD.MM.YY")}</a>
            </div>
            <div data-add>
                {token ? (
                    <div
                        data-loading={loading}
                        data-favorite
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            handle()
                        }}
                    >
                        <img
                            src={
                                isFavorite(id!)
                                    ? "/svg/tag-fill.svg"
                                    : "/svg/tag-regular.svg"
                            }
                            alt="tag--"
                            width={25}
                            height={25}
                        />
                    </div>
                ) : null}
                <ButtonAddCart id={id} int={1} />
            </div>
        </li>
    )
}
