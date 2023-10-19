"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductData } from "@/types/types"
import { TabsDetails } from "@/components/common/tabs-details"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { ITEMS_TABS } from "../constants/tabs"
import { usePush } from "@/helpers/hooks/usePush"
import { mutateUpdateProductDraft } from "@/apollo/mutation"
import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/page-uuid.module.scss"
import { ProposalsMeUUID } from "./ProposalsMeUUID"

export const MyProductPageUUID = () => {
    const { handlePush } = usePush()
    const [tab, setTab] = useState<IItemTab>(ITEMS_TABS[0])
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
        <div className={styles.wrapper}>
            <header>
                <h1>{productById?.name}</h1>
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
                        <h2>{productById?.description}</h2>
                        <div data-tags>
                            {productById?.category?.id ? (
                                <TagCategory
                                    text={productById?.category?.name}
                                />
                            ) : null}
                        </div>
                        <div data-price-block>
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
                    </article>
                </motion.section>
            ) : tab.value === "proposals" ? (
                <ProposalsMeUUID />
            ) : tab.value === "testimonials" ? (
                <div />
            ) : null}
        </div>
    )
}
