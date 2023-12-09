"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { IRequestProductRoot } from "@/types/types"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { Outline } from "@/components/common/outline"
import { TabsDetails } from "@/components/common/tabs-details"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { ITEMS_TABS } from "../constants/tabs"
import { usePush } from "@/helpers/hooks/usePush"
import { queryProductRequestById } from "@/apollo/query"
import { mutateUpdateProductRequestDraft, mutationProductRequestUpdate } from "@/apollo/mutation"

import styles from "../styles/page-uuid.module.scss"

export const MyRequestsPageUUID = ({ id }: { id: string }) => {
    const { handlePush } = usePush()
    const [tab, setTab] = useState<IItemTab>(ITEMS_TABS[0])

    const [mutateDraft] = useMutation(mutateUpdateProductRequestDraft)
    const [deleteRequest] = useMutation(mutationProductRequestUpdate, {
        variables: { productRequestId: id },
    })
    const { data, refetch } = useQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id },
    })
    const { productRequestById } = data ?? {}

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
        if (!productRequestById || !Array.isArray(productRequestById?.photoListUrl)) {
            return []
        }
        return productRequestById?.photoListUrl
            ?.filter((item) => item.photoUrl)
            ?.map((item, index) => ({
                item: item,
                index: index,
            }))
    }, [productRequestById])

    function handleDelete() {
        deleteRequest().finally(() => {
            handlePush(`/my-requests`)
        })
    }

    const isDataFull = useMemo(() => {
        const boolean = [
            !!productRequestById?.category?.id,
            !!productRequestById?.name,
            !!productRequestById?.description,
            !!productRequestById?.price,
            !!productRequestById?.photoListUrl?.length,
        ].every((item) => item === true)
        return boolean
    }, [productRequestById])

    const dataNotCategory = useMemo(() => {
        if (isDataFull) {
            return null
        }
        const obj = {
            category: !productRequestById?.category?.id ? `категории` : null,
            name: !productRequestById?.name ? `названия` : null,
            description: !productRequestById?.description ? `описания` : null,
            price: !productRequestById?.price ? `не установлена цена` : null,
            photoListUrl: !productRequestById?.photoListUrl?.length ? `фотографии` : null,
        }

        return Object.values(obj)
            .filter((item) => !!item)
            .join(", ")
    }, [productRequestById, isDataFull])

    const attrs = useMemo(() => {
        return productRequestById?.attributeList || []
    }, [productRequestById])

    if (!data?.productRequestById) return null

    return (
        <div className={styles.wrapper}>
            <header>
                <Link href={{ pathname: `/my-requests` }}>
                    <img src="/svg/arrow-left.svg" alt="chevron" width={24} height={24} />
                </Link>
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
                    <div data-buttons>
                        {productRequestById?.draft && isDataFull ? (
                            <button data-black onClick={handlePublish}>
                                <span>Опубликовать</span>
                                <img src="/svg/globe-06.svg" alt="globe-06" width={20} height={20} />
                            </button>
                        ) : (
                            <article>
                                <p>
                                    Для того, что-бы опубликовать ваш запрос, вам не хватает некоторой информации о запросе, а именно:{" "}
                                    <Link href={{ pathname: `/my-products/${id}/change` }}>{dataNotCategory}</Link>
                                </p>
                            </article>
                        )}
                        {productRequestById?.draft ? (
                            <Link data-black-border href={{ pathname: `/my-requests/${id}/change` }}>
                                <span>Редактировать</span>
                                <img src="/svg/replace.svg" alt="replace" width={20} height={20} />
                            </Link>
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
