"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { IRequestProductRoot } from "@/types/types"
import type { IPhotoProductRequestData } from "@/types/types"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { Outline } from "@/components/common/outline"
import { TabsDetails } from "@/components/common/tabs-details"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { ITEMS_TABS } from "../constants/tabs"
import { usePush } from "@/helpers/hooks/usePush"
import { queryPhotosProductRequestById, queryProductRequestById } from "@/apollo/query"
import { mutateUpdateProductRequestDraft, mutationProductRequestUpdate } from "@/apollo/mutation"

import styles from "../styles/page-uuid.module.scss"

export const MyRequestsPageUUID = ({ id }: { id: string }) => {
    const { handlePush, handleReplace } = usePush()
    const [tab, setTab] = useState<IItemTab>(ITEMS_TABS[0])

    const [mutateDraft] = useMutation(mutateUpdateProductRequestDraft)
    const [deleteRequest] = useMutation(mutationProductRequestUpdate, {
        variables: { productRequestId: id },
    })
    const { data, refetch } = useQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id: id },
    })
    const { data: dataPhotos } = useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
        variables: { id: id },
    })
    const { productRequestById } = data ?? {}

    function handleChange() {
        handlePush(`/my-requests/${id}/change`)
    }

    function handlePublish() {
        if (productRequestById?.draft) {
            mutateDraft({
                variables: {
                    productRequestId: id,
                },
            }).finally(refetch)
        }
    }

    const images = useMemo(() => {
        if (!dataPhotos?.productRequestById || !Array.isArray(dataPhotos?.productRequestById?.photoListUrl)) {
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
        return !!item?.category?.id && !!item?.name && !!item?.description && !!item?.price
    }, [data?.productRequestById])

    function handleDelete() {
        deleteRequest().finally(() => {
            handleReplace(`/my-requests`)
        })
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <img
                    src="/svg/arrow-left.svg"
                    alt="arrow-left"
                    height={32}
                    width={32}
                    onClick={() => {
                        handleReplace(`/my-requests`)
                    }}
                />
                <h3>{productRequestById?.name}</h3>
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
                        <Outline label="Краткое описание">
                            <h2>{productRequestById?.description}</h2>
                        </Outline>
                        <Outline label="Категории">
                            <div data-tags>
                                {productRequestById?.category?.id ? <TagCategory text={productRequestById?.category?.name} /> : null}
                            </div>
                        </Outline>
                        <Outline label="Желаемая цена:">
                            <div data-price-block>
                                {productRequestById?.price?.toFixed(0) ? (
                                    <h3>{Number(productRequestById?.price)?.toFixed(0) || 0} ₸</h3>
                                ) : (
                                    <i>Предположительная цена не выставлена</i>
                                )}
                            </div>
                        </Outline>
                        <h6>
                            Количество: <span>{productRequestById?.quantity || 1}</span>
                        </h6>
                    </article>
                    <div data-buttons>
                        {productRequestById?.draft && isDataFull ? (
                            <button data-black onClick={handlePublish}>
                                <span>Опубликовать</span>
                                <img src="/svg/globe-06.svg" alt="globe-06" width={20} height={20} />
                            </button>
                        ) : null}
                        {productRequestById?.draft ? (
                            <button data-black-border onClick={handleChange}>
                                <span>Редактировать</span>
                                <img src="/svg/replace.svg" alt="replace" width={20} height={20} />
                            </button>
                        ) : null}
                        <button data-delete={!!productRequestById?.draft} onClick={handleDelete}>
                            <span>Удалить</span>
                            <img
                                src={productRequestById?.draft ? "/svg/trash-01.svg" : "/svg/box.svg"}
                                alt="replace"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </motion.section>
            ) : null}
        </div>
    )
}
