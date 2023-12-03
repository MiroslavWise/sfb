"use client"

import { useMemo } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { IProductRoot } from "@/types/types"

import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagCategory } from "../../proposals/components/TagCategory"

import { queryProductById } from "@/apollo/query"
import { usePush } from "@/helpers/hooks/usePush"
import { mutateUpdateProductDraft, mutationProductDelete } from "@/apollo/mutation"

import styles from "../styles/merchandise-id.module.scss"

export const MerchandiseId = ({ id, productId }: { id: string; productId: string }) => {
    const { handlePush } = usePush()
    const { data, refetch, loading } = useQuery<IProductRoot>(queryProductById, {
        variables: { id: productId },
    })
    const [mutateDraft] = useMutation(mutateUpdateProductDraft)
    const [deleteProduct] = useMutation(mutationProductDelete, {
        variables: { productId },
    })

    const { productById } = data ?? {}

    const images = useMemo(() => {
        return (
            data?.productById?.photoListUrl
                ?.filter((item) => item.photoUrl)
                ?.map((item, index) => ({
                    item: item,
                    index: index,
                })) || []
        )
    }, [data?.productById])

    const isDataFull = useMemo(() => {
        const item = data?.productById
        return !!item?.category?.id && !!item?.name && !!item?.description && !!item?.price && !!item?.photoListUrl?.length
    }, [data?.productById])

    function handleChange() {
        handlePush(`/my-shop/${id}/merchandise/${productId}/change`)
    }

    function handlePublish() {
        if (productById?.draft) {
            mutateDraft({
                variables: {
                    productId: productId,
                },
            }).finally(() => {
                refetch()
            })
        }
    }

    function handleDelete() {
        deleteProduct()
            .then((response) => {
                console.log("deleteProduct then: ", response?.data, response?.errors)
            })
            .finally(() => {
                handlePush(`/my-shop/${id}/merchandise`)
            })
    }

    return (
        <div className={styles.wrapper}>
            <PhotoStage images={images} />
            <section>
                <Outline label="Наименование товара">
                    <h2>{productById?.name}</h2>
                </Outline>
                <Outline label="Краткое описание">
                    <h2>{productById?.description}</h2>
                </Outline>
                <Outline label="Категории">
                    <div data-tags>{productById?.category?.id ? <TagCategory text={productById?.category?.name} /> : null}</div>
                </Outline>
                <Outline label="Цена">
                    <div data-price-block>
                        {productById?.price ? (
                            <h3>{Number(productById?.price)?.toFixed(0)} ₸</h3>
                        ) : (
                            <i>Предположительная цена не выставлена</i>
                        )}
                    </div>
                </Outline>
                <h6>
                    Количество: <span>{productById?.quantity! || 1}</span>
                </h6>
            </section>
            {productById?.isActive ? (
                <div data-buttons>
                    {productById?.draft && isDataFull ? (
                        <button data-black onClick={handlePublish}>
                            <span>Опубликовать</span>
                            <img src="/svg/globe-06.svg" alt="globe-06" width={20} height={20} />
                        </button>
                    ) : null}
                    {productById?.draft ? (
                        <button data-black-border onClick={handleChange}>
                            <span>Редактировать</span>
                            <img src="/svg/replace.svg" alt="replace" width={20} height={20} />
                        </button>
                    ) : null}
                    <button data-delete={!!productById?.draft} onClick={handleDelete}>
                        <span>{productById?.draft ? "Удалить" : "В архив"}</span>
                        <img src={productById?.draft ? "/svg/trash-01.svg" : "/svg/box.svg"} alt="replace" width={20} height={20} />
                    </button>
                </div>
            ) : null}
        </div>
    )
}
