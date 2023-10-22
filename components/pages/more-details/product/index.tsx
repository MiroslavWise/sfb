"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IPhotoProductData, IProductRoot } from "@/types/types"

import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/style.module.scss"
import { TagAmount } from "@/components/common/tag-amount"

export const ProductId = () => {
    const productId = useSearchParams().get("product-id")
    const { data, loading } = useQuery<IProductRoot>(queryProductById, {
        variables: {
            id: productId,
        },
    })
    const { data: dataPhotos, loading: loadingPhoto } =
        useQuery<IPhotoProductData>(queryPhotosProductById, {
            variables: {
                id: productId,
            },
        })

    const { productById } = data ?? {}

    const images = useMemo(() => {
        if (dataPhotos?.productById?.photoListUrl) {
            return dataPhotos?.productById?.photoListUrl?.map(
                (item, index) => ({ item, index }),
            )
        }

        return []
    }, [dataPhotos?.productById])

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
                <h1>{productById?.name}</h1>
            </header>
            <section>
                <PhotoStage images={images} />
                <article>
                    <Outline label="Описание">
                        <h2>{productById?.description}</h2>
                    </Outline>
                    <Outline label="Категории">
                        <div data-tags>
                            {productById?.category?.id ? (
                                <TagCategory
                                    text={productById?.category?.name}
                                />
                            ) : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            <h3>{productById?.price || 0} ₸</h3>
                        </div>
                    </Outline>
                    <Outline label="Количество">
                        <TagAmount count={productById?.quantity} />
                    </Outline>
                </article>
            </section>
        </motion.div>
    )
}
