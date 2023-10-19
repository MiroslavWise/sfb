"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { memo, useEffect, useId, useMemo, useRef, useState } from "react"

import type { TItemProposalsPage } from "../../proposals/types/types"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item.module.scss"

const $ItemProduct: TItemProposalsPage = (props) => {
    const {
        id,
        author: { fullName },
        name,
        price,
        category,
        photoListUrl,
    } = props ?? {}
    const idUse = useId()
    const isInterval = useRef(false)

    const { handlePush } = usePush()

    const images = useMemo(() => {
        if (!Array.isArray(photoListUrl) || !photoListUrl) {
            return []
        }
        return photoListUrl
            .filter((item) => item?.photoUrl)
            ?.map((item, index) => ({
                file: item,
                index: index,
            }))
    }, [photoListUrl])
    const [currentPhoto, setCurrentPhoto] = useState<number>(0)

    return (
        <section
            className={styles.container}
            onClick={() => {
                handlePush(`/my-products?product-id=${id}`)
            }}
        >
            <div data-image>
                {images.length ? (
                    <Image
                        src={
                            images.find((item) => item.index === currentPhoto)
                                ?.file?.photoUrl!
                        }
                        alt={
                            images.find((item) => item.index === currentPhoto)
                                ?.file?.id!
                        }
                        width={300}
                        height={300}
                        unoptimized
                    />
                ) : (
                    <div data-null />
                )}
            </div>
            <div data-name>
                <section data-title-price>
                    <h2>{name}</h2>
                    <h2 data-price>{price} ₸</h2>
                </section>
                <section data-category-location>
                    <a>{category?.name}</a>
                    <p>г. Алматы, Советский р-он</p>
                </section>
            </div>
            <div data-author>
                <div data-avatar-name>
                    {images.length ? (
                        <Image
                            src={images[0]?.file?.photoUrl}
                            alt={images[0]?.file?.id}
                            width={300}
                            height={300}
                            unoptimized
                        />
                    ) : (
                        <div />
                    )}
                    <p>{fullName}</p>
                </div>
                <div data-rating>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Image
                            key={`${item}-${idUse}`}
                            src="/svg/shape.svg"
                            alt="shape"
                            width={16}
                            height={16}
                        />
                    ))}
                    <p>4.8</p>
                </div>
            </div>
            <p data-date>Сегодня, {dayjs().format("HH:mm")}</p>
        </section>
    )
}

export const ItemProduct = memo($ItemProduct)
