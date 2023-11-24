"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { memo, useMemo } from "react"

import type { TItemProposalsPage } from "../../proposals/types/types"
import {
    ComponentAddress,
    ComponentArea,
    ComponentCity,
} from "@/components/common/component-regions"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item.module.scss"

const $ItemRequestsPage: TItemProposalsPage = (props) => {
    const {
        id,
        author: { fullName, photo, city, address },
        name,
        price,
        category,
        photoListUrl,
        createdAt,
    } = props ?? {}

    const { handleReplace } = usePush()

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
        <section
            className={styles.container}
            onClick={() => {
                handleReplace(`/my-requests?request-id=${id}`)
            }}
        >
            <div data-image>
                {images.length ? (
                    <Image
                        src={images[0]?.file?.photoUrl!}
                        alt={images[0]?.file?.id!}
                        width={300}
                        height={300}
                    />
                ) : (
                    <div data-null />
                )}
            </div>
            <div data-name>
                <section data-title-price>
                    <h2>{name}</h2>
                    <h2 data-price>{Number(price)?.toFixed(0) || 0} ₸</h2>
                </section>
                <section data-category-location>
                    <a>{category?.name}</a>
                    <div data-regions>
                        {city?.region && (
                            <ComponentArea name={city?.region?.name!} />
                        )}
                        {city && <ComponentCity name={city?.name} />}
                        {address && <ComponentAddress name={address} />}
                    </div>
                </section>
            </div>
            <p data-date>{dayjs(createdAt).format("HH:mm DD.MM.YYYY")}</p>
        </section>
    )
}

export const ItemRequestsPage = memo($ItemRequestsPage)
