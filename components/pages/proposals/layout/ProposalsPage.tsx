"use client"

import { useMemo } from "react"
import Image from "next/image"
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
                    console.log("chatId: ", chatId)
                    handlePush(`/messages?chat-id=${chatId}`)
                }
            })
            .finally(() => {})
    }

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
                    <footer>
                        <button data-black-border onClick={handleCreateChat}>
                            <span>Написать покупателю</span>
                            <Image
                                src="/svg/message-plus-circle.svg"
                                alt="message-plus-circle"
                                width={20}
                                height={20}
                            />
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    )
}
