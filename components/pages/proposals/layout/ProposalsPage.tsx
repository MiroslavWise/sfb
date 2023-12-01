"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductRequestData, IRequestProductRoot } from "@/types/types"

import { TagCategory } from "../components/TagCategory"
import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { ComponentAddress, ComponentArea, ComponentCity } from "@/components/common/component-regions"

import { usePush } from "@/helpers/hooks/usePush"
import { mutateChatCreate } from "@/apollo/mutation"
import { queryPhotosProductRequestById, queryProductRequestById } from "@/apollo/query"

import styles from "../styles/proposals-page-UUID.module.scss"

export const ProposalsPageUUID = () => {
    const id = useSearchParams().get("proposal-id")
    const { handlePush } = usePush()
    const [productId, productRequestId] = id?.split(":") ?? []
    const { data, loading } = useQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id: productRequestId },
    })
    const [create] = useMutation(mutateChatCreate)
    const { productRequestById } = data ?? {}
    const { data: dataPhotos, loading: loadingPhotos } = useQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
        variables: { id: productRequestId },
    })

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
                            {productRequestById?.category?.id ? <TagCategory text={productRequestById?.category?.name} /> : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            {productRequestById?.price?.toFixed(0) ? (
                                <h3>{Number(productRequestById?.price)?.toFixed(0) || 0} ₸</h3>
                            ) : (
                                <i>Предположительная цена не выставлена</i>
                            )}
                        </div>
                    </Outline>
                    <Outline label="Количество">
                        <p>{productRequestById?.quantity!}</p>
                    </Outline>
                    <Outline label="Адрес">
                        <div data-regions>
                            {productRequestById?.author?.city?.region && (
                                <ComponentArea name={productRequestById?.author?.city?.region?.name!} />
                            )}
                            {productRequestById?.author?.city && <ComponentCity name={productRequestById?.author?.city?.name} />}
                            {productRequestById?.author?.address && <ComponentAddress name={productRequestById?.author?.address} />}
                        </div>
                    </Outline>
                    <button data-black-border onClick={handleCreateChat}>
                        <span>Написать покупателю</span>
                        <img src="/svg/message-plus-circle.svg" alt="message-plus-circle" width={20} height={20} />
                    </button>
                </article>
            </motion.section>
        </div>
    )
}
