"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IRequestProductRoot, TTabsDetailsRequest } from "@/types/types"
import type { IPhotoProductRequestData } from "@/types/types"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import {
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"
import { ITEMS_TABS } from "../constants/tabs"
import { usePush } from "@/helpers/hooks/usePush"
import { TabsDetails } from "@/components/common/tabs-details"
import { mutateUpdateProductRequestDraft } from "@/apollo/mutation"

import styles from "../styles/page-uuid.module.scss"

export const MyRequestsPageUUID = () => {
    const uuid = useSearchParams().get("request-id")
    const { handlePush } = usePush()
    const [tab, setTab] = useState<IItemTab>(ITEMS_TABS[0])

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

    const isDataFull = useMemo(() => {
        const item = data?.productRequestById
        return (
            !!item?.category?.id &&
            !!item?.name &&
            !!item?.description &&
            !!item?.price
        )
    }, [data?.productRequestById])

    if (loading || !productRequestById) return null

    return (
        <div className={styles.wrapper}>
            <header>
                <h1>{productRequestById?.name}</h1>
                <div data-buttons>
                    <button data-black-border onClick={handleChange}>
                        <span>Редактировать</span>
                        <Image
                            src="/svg/replace.svg"
                            alt="replace"
                            width={20}
                            height={20}
                        />
                    </button>
                    {productRequestById?.draft && isDataFull ? (
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
                </div>
            </header>
            <TabsDetails items={ITEMS_TABS} set={setTab} current={tab} />
            {tab.value === "main" ? (
                <motion.section
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                >
                    <PhotoStage images={images} />
                    <article>
                        <h2>{productRequestById?.description}</h2>
                        <div data-tags>
                            {productRequestById?.category?.id ? (
                                <TagCategory
                                    text={productRequestById?.category?.name}
                                />
                            ) : null}
                        </div>
                        <div data-price-block>
                            {productRequestById?.price ? (
                                <h3>{productRequestById?.price} ₸</h3>
                            ) : (
                                <i>Предположительная цена не выставлена</i>
                            )}
                        </div>
                    </article>
                </motion.section>
            ) : null}
        </div>
    )
}
