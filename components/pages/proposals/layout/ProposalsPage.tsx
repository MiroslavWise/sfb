"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type {
    IPhotoProductRequestData,
    IRequestProductRoot,
} from "@/types/types"

import { TagCategory } from "../components/TagCategory"
import { PhotoStage } from "@/components/common/PhotoStage"

import {
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"
import { mutateChatCreate } from "@/apollo/mutation"

import styles from "../styles/proposals-page-UUID.module.scss"
import { usePush } from "@/helpers/hooks/usePush"
import { Outline } from "@/components/common/outline"
import { TagAmount } from "@/components/common/tag-amount"

export const ProposalsPageUUID = () => {
    const id = useSearchParams().get("proposal-id")
    const { handlePush } = usePush()
    const [productId, productRequestId] = id?.split(":") ?? []
    const { data, loading } = useQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: { id: productRequestId },
        },
    )
    const [create] = useMutation(mutateChatCreate)
    const { productRequestById } = data ?? {}
    const { data: dataPhotos, loading: loadingPhotos } =
        useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
            variables: { id: productRequestId },
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

    function handleCreateChat() {
        create({
            variables: {
                productId: productId,
                productRequestId: productRequestId,
            },
        })
            .then((response) => {
                if (response.data?.chatCreate?.ok) {
                    const chatId = response?.data?.chatCreate?.chat?.id
                    handlePush(`/messages?chat-id=${chatId}`)
                }
            })
            .finally(() => {})
    }

    return (
        <div className={styles.wrapper}>
            <header>
                <h1>{productRequestById?.name}</h1>
            </header>
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
                            {productRequestById?.category?.id ? (
                                <TagCategory
                                    text={productRequestById?.category?.name}
                                />
                            ) : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            {productRequestById?.price ? (
                                <h3>{productRequestById?.price} ₸</h3>
                            ) : (
                                <i>Предположительная цена не выставлена</i>
                            )}
                        </div>
                    </Outline>
                    <Outline label="Количество">
                        <TagAmount count={productRequestById?.quantity} />
                    </Outline>
                    <button data-black-border onClick={handleCreateChat}>
                        <span>Написать покупателю</span>
                        <Image
                            src="/svg/message-plus-circle.svg"
                            alt="message-plus-circle"
                            width={20}
                            height={20}
                        />
                    </button>
                </article>
            </motion.section>
        </div>
    )
}
