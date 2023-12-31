import dayjs from "dayjs"
import Image from "next/image"
import type { IProduct } from "@/types/types"

import { ButtonAddCart } from "@/components/common/button-add-cart"

import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { usePush } from "@/helpers/hooks/usePush"

export const ItemFavorite = (props: IProduct) => {
    const { photoListUrl, price, name, city, createdAt, id } = props ?? {}
    const { handlePush } = usePush()
    const { isFavorite, handleFavorite, loading } = useFavoritesClick()

    function handle() {
        handleFavorite(id)
    }

    const is = isFavorite(id!)

    return (
        <li
            onClick={() => {
                handlePush(`/product/${id}`)
            }}
        >
            {photoListUrl[0] ? (
                <Image src={photoListUrl[0]?.photoUrl!} alt="photo" width={200} height={200} unoptimized />
            ) : (
                <div data-img>
                    <p>Фотографий нет</p>
                </div>
            )}
            <h3>{Number(price)?.toFixed(0) || 0} ₸</h3>
            <h5>{name}</h5>
            <a data-city>{city?.name}</a>
            <div data-time>
                <img src="/svg/calendar-date.svg" alt="calendar" width={12} height={12} />
                <a>{dayjs(createdAt).format("HH:mm DD.MM.YY")}</a>
            </div>
            <div data-absolute>
                <div
                    data-loading={loading}
                    data-favorite
                    onClick={(event) => {
                        event.stopPropagation()
                        event.preventDefault()
                        handle()
                    }}
                >
                    <img src={is ? "/svg/heart-fill.svg" : "/svg/heart.svg"} alt="--heart--" width={25} height={25} />
                </div>
                <ButtonAddCart id={id} int={1} />
            </div>
        </li>
    )
}
