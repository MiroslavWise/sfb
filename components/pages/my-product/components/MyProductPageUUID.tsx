"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductData } from "@/types/types"

import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { usePush } from "@/helpers/hooks/usePush"
import { mutateUpdateProductDraft } from "@/apollo/mutation"
import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/page-uuid.module.scss"

export const MyProductPageUUID = () => {
    const { handlePush } = usePush()
    const uuid = useSearchParams().get("product-id")

    const [mutateDraft] = useMutation(mutateUpdateProductDraft)

    const { data, loading, refetch } = useQuery(queryProductById, {
        variables: { id: uuid },
    })
    const { productById } = data ?? {}
    const { data: dataPhotos } = useQuery<IPhotoProductData>(
        queryPhotosProductById,
        {
            variables: { id: uuid },
        },
    )

    console.log("productById: ", productById)

    function handleChange() {
        handlePush(`/my-products/change?product-id=${uuid}`)
    }

    function handlePublish() {
        if (productById?.draft) {
            mutateDraft({
                variables: {
                    productId: uuid,
                },
            }).finally(() => {
                refetch().finally(() => {})
            })
        }
    }

    const images = useMemo(() => {
        if (
            !dataPhotos?.productById ||
            !Array.isArray(dataPhotos?.productById?.photoListUrl)
        ) {
            return []
        }
        return dataPhotos?.productById?.photoListUrl
            ?.filter((item) => item.photoUrl)
            ?.map((item, index) => ({
                item: item,
                index: index,
            }))
    }, [dataPhotos?.productById])

    const isDataFull = useMemo(() => {
        const item = data?.productById
        return (
            !!item?.category?.id &&
            !!item?.name &&
            !!item?.description &&
            !!item?.price
        )
    }, [data?.productById])

    return (
        <>
            <div className={styles.wrapper}>
                <PhotoStage images={images} />
                <div data-description>
                    <div data-sub-description>
                        <div data-title>
                            <h1>{productById?.name}</h1>
                            <p>г. Алматы</p>
                        </div>
                        <div data-tags>
                            {productById?.category?.id ? (
                                <TagCategory
                                    text={productById?.category?.name}
                                />
                            ) : null}
                        </div>
                        <div data-short-description>
                            <h4>
                                Краткое описание <sup>*</sup>
                            </h4>
                            <a>
                                {productById?.description || (
                                    <i>Описания нет</i>
                                )}
                            </a>
                        </div>
                    </div>
                    <div data-author-price>
                        <div data-price-block>
                            <h5>
                                Стоимость <sup>*</sup>
                            </h5>
                            {productById?.price ? (
                                <h3>{productById?.price} ₸</h3>
                            ) : (
                                <i>Предположительная цена не выставлена</i>
                            )}
                        </div>
                        <footer>
                            <button data-black-border onClick={handleChange}>
                                <span>Редактировать</span>
                                <Image
                                    src="/svg/replace.svg"
                                    alt="replace"
                                    width={20}
                                    height={20}
                                />
                            </button>
                            {productById?.draft && isDataFull ? (
                                <button data-black onClick={handlePublish}>
                                    <span>Опубликовать</span>
                                    <Image
                                        src="/svg/globe-06.svg"
                                        alt="globe-06"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            ) : null}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
