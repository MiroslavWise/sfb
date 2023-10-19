"use client"

import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import {
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"

import styles from "../styles/proposals-page-UUID.module.scss"
import { PhotoStage } from "@/components/common/PhotoStage"
import { useMemo } from "react"
import { IPhotoProductRequestData, IRequestProductRoot } from "@/types/types"
import Image from "next/image"
import { TagCategory } from "../components/TagCategory"

export const ProposalsPageUUID = () => {
    const id = useSearchParams().get("proposal-id")

    const { data, loading } = useQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: { id },
        },
    )
    const { productRequestById } = data ?? {}
    const { data: dataPhotos, loading: loadingPhotos } =
        useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
            variables: { id },
        })

    const images = useMemo(() => {
        if (
            !dataPhotos?.productRequestById ||
            !Array.isArray(dataPhotos?.productRequestById?.photoListUrl)
        ) {
            return []
        }
        return dataPhotos?.productRequestById?.photoListUrl
            ?.filter((item) => item.photoUrl)
            ?.map((item, index) => ({
                item: item,
                index: index,
            }))
    }, [dataPhotos?.productRequestById])

    return (
        <div className={styles.wrapper}>
            <PhotoStage images={images} />
            <div data-description>
                <div data-sub-description>
                    <div data-title>
                        <h1>{productRequestById?.name}</h1>
                        <p>г. Алматы</p>
                    </div>
                    <div data-tags>
                        {productRequestById?.category?.id ? (
                            <TagCategory
                                text={productRequestById?.category?.name}
                            />
                        ) : null}
                    </div>
                    <div data-short-description>
                        <h4>Краткое описание</h4>
                        <a>
                            {productRequestById?.description || (
                                <i>Описания нет</i>
                            )}
                        </a>
                    </div>
                </div>
                <div data-author-price>
                    <div data-price-block>
                        <h5>Стоимость</h5>
                        {productRequestById?.price ? (
                            <h3>{productRequestById?.price} ₸</h3>
                        ) : (
                            <i>Предположительная цена не выставлена</i>
                        )}
                    </div>
                    <footer></footer>
                </div>
            </div>
        </div>
    )
}
