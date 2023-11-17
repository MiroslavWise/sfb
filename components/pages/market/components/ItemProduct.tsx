import dayjs from "dayjs"
import Image from "next/image"
import { type FC } from "react"

import type { IProduct } from "@/types/types"

import { usePush } from "@/helpers/hooks/usePush"

export const ItemProduct: FC<IProduct> = (props) => {
    const { photoListUrl, price, name, city, createdAt, id } = props ?? {}
    const { handlePush } = usePush()

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
            <h3>{price}₸</h3>
            <h5>{name}</h5>
            <a data-city>{city?.name}</a>
            <div data-time>
                <Image
                    src="/svg/calendar-date.svg"
                    alt="calendar"
                    width={12}
                    height={12}
                />
                <a>{dayjs(createdAt).format("HH:mm DD.MM.YY")}</a>
            </div>
        </li>
    )
}
