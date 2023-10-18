"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductRequestData } from "@/types/types"
import type { IRequestProductRoot } from "@/types/types"

import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { usePush } from "@/helpers/hooks/usePush"
import {
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"
import { mutateUpdateProductRequestDraft } from "@/apollo/mutation"

import styles from "../styles/page-uuid.module.scss"

export const MyRequestsPageUUID = () => {
    const uuid = useSearchParams().get("request-id")
    const { handlePush } = usePush()

    const [mutateDraft] = useMutation(mutateUpdateProductRequestDraft)
    const { data, loading, refetch } = useQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: { id: uuid },
        },
    )
    const { data: dataPhotos } = useQuery<IPhotoProductRequestData>(
        queryPhotosProductRequestById,
        {
            variables: { id: uuid },
        },
    )
    const { productRequestById } = data ?? {}

    function handleChange() {
        handlePush(`/my-requests/change?request-id=${uuid}`)
    }

    function handlePublish() {
        if (productRequestById?.draft) {
            mutateDraft({
                variables: {
                    productRequestId: uuid,
                },
            }).finally(() => {
                refetch().finally(() => {})
            })
        }
    }

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

    if (loading || !productRequestById) return null

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
                        <h4>
                            Краткое описание <sup>*</sup>
                        </h4>
                        <a>
                            {productRequestById?.description || (
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
                        {productRequestById?.price ? (
                            <h3>{productRequestById?.price} ₸</h3>
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
                        {productRequestById?.draft ? (
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
    )
}
