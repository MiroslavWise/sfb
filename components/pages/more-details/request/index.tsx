"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"

import type { IPhotoProductRequestData, IRequestProductRoot } from "@/types/types"

import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { ButtonBack } from "@/components/common/button-back"
import { TagCategory } from "../../proposals/components/TagCategory"
import { ComponentAddress, ComponentArea, ComponentCity } from "@/components/common/component-regions"

import { queryProductRequestById, queryPhotosProductRequestById } from "@/apollo/query"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/style.module.scss"

export const RequestId = ({ id }: { id: string }) => {
    const { back } = usePush()
    const { data, loading } = useQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id },
    })
    const { data: dataPhotos, loading: loadingPhoto } = useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
        variables: { id },
    })

    const { productRequestById } = data ?? {}

    const images = useMemo(() => {
        if (dataPhotos?.productRequestById?.photoListUrl) {
            return dataPhotos?.productRequestById?.photoListUrl?.map((item, index) => ({ item, index }))
        }

        return []
    }, [dataPhotos?.productRequestById])

    const attrs = useMemo(() => {
        return productRequestById?.attributeList || []
    }, [productRequestById])

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
                <ButtonBack onClick={back} />
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
                            {productRequestById?.category?.id ? <TagCategory text={productRequestById?.category?.name} /> : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            <h3>{productRequestById?.price || 0} ₸</h3>\
                        </div>
                    </Outline>
                    <h6>Количество: {productRequestById?.quantity! || 1}</h6>
                    {attrs.length ? (
                        <Outline label="Дополнительные атрибуты">
                            <div data-attrs>
                                {attrs.map((item) => (
                                    <div data-h>
                                        <p>{item.name}</p>
                                        <div data-dashed />
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Outline>
                    ) : null}
                </article>
            </section>
        </motion.div>
    )
}
