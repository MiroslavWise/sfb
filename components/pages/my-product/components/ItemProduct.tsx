"use client"

import dayjs from "dayjs"
import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import type { TItemProposalsPage } from "../../proposals/types/types"

import { ComponentAddress, ComponentArea, ComponentCity } from "@/components/common/component-regions"

import styles from "../styles/item.module.scss"

export const ItemProduct: TItemProposalsPage = (props) => {
    const {
        id,
        author: { address, city },
        name,
        price,
        category,
        photoListUrl,
        createdAt,
    } = props ?? {}

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

    return (
        <Link className={styles.container} href={`/my-products/${id}/`} prefetch>
            <div data-image>
                {images.length ? (
                    <Image src={images[0]?.file?.photoUrl!} alt={images[0]?.file?.id!} width={300} height={300} unoptimized />
                ) : (
                    <div data-null />
                )}
            </div>
            <div data-name>
                <section data-title-price>
                    <h2>{name}</h2>
                    <h2 data-price>{Number(price)?.toFixed(0)} ₸</h2>
                </section>
                <section data-category-location>
                    <a>{category?.name}</a>
                    <div data-regions>
                        {city?.region && <ComponentArea name={city?.region?.name!} />}
                        {city && <ComponentCity name={city?.name} />}
                        {address && <ComponentAddress name={address} />}
                    </div>
                </section>
            </div>
            <time data-date>{dayjs(createdAt).format("HH:mm DD.MM.YYYY")}</time>
        </Link>
    )
}
