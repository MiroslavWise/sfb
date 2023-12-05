"use client"

import dayjs from "dayjs"
import { useMemo } from "react"
import Image from "next/image"

import type { TItemProposalsPage } from "../../proposals/types/types"
import styles from "../styles/item.module.scss"
import Link from "next/link"

export const ItemRequestsPage: TItemProposalsPage = (props) => {
    const { id, name, price, draft, photoListUrl, createdAt } = props ?? {}

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
        <Link className={styles.container} href={`/my-requests?request-id=${id}`}>
            {images.length ? (
                <Image src={images[0]?.file?.photoUrl!} alt={images[0]?.file?.id!} width={300} height={300} unoptimized />
            ) : (
                <div data-img />
            )}
            <div data-is={draft}>
                <p>{draft ? "Черновик" : "Опубликовано"}</p>
            </div>
            <div data-title>
                <h3>{Number(price)?.toFixed(0) || 0} ₸</h3>
            </div>
            <h5>{name}</h5>
            <div data-time>
                <img src="/svg/calendar-date.svg" alt="calendar" width={12} height={12} />
                <a>{dayjs(createdAt).format("HH:mm DD.MM.YY")}</a>
            </div>
        </Link>
    )
}
