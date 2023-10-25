"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type {
    IPhotoProductRequestData,
    IRequestProductRoot,
} from "@/types/types"

import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import {
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"

import styles from "../styles/style.module.scss"
import { TagAmount } from "@/components/common/tag-amount"

export const RequestId = () => {
    const requestId = useSearchParams().get("request-id")
    const { data, loading } = useQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: {
                id: requestId,
            },
        },
    )
    const { data: dataPhotos, loading: loadingPhoto } =
        useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
            variables: {
                id: requestId,
            },
        })

    const { productRequestById } = data ?? {}

    const images = useMemo(() => {
        if (dataPhotos?.productRequestById?.photoListUrl) {
            return dataPhotos?.productRequestById?.photoListUrl?.map(
                (item, index) => ({ item, index }),
            )
        }

        return []
    }, [dataPhotos?.productRequestById])

    if (loading || loadingPhoto) return null

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
        >
            <header>
                <h1>{productRequestById?.name}</h1>
            </header>
            <section>
                <PhotoStage images={images} />
                <article>
                    <Outline label="Описание">
                        <h2>{productRequestById?.description}</h2>
                    </Outline>
                    <Outline label="Категории">
                        <div data-tags>
                            {productRequestById?.category?.id ? (
                                <TagCategory
                                    text={productRequestById?.category?.name}
                                />
                            ) : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            <h3>{productRequestById?.price || 0} ₸</h3>\
                        </div>
                    </Outline>
                    <Outline label="Количество">
                        <TagAmount count={productRequestById?.quantity!} />
                    </Outline>
                </article>
            </section>
        </motion.div>
    )
}
