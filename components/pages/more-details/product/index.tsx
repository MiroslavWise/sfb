"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IPhotoProductData, IProductRoot } from "@/types/types"

import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/style.module.scss"

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
                    <h2>{productById?.description}</h2>
                    <div data-tags>
                        {productById?.category?.id ? (
                            <TagCategory text={productById?.category?.name} />
                        ) : null}
                    </div>
                    <div data-price-block>
                        <h3>{productById?.price || 0} ₸</h3>
                    </div>
                </article>
            </section>
        </motion.div>
    )
}
