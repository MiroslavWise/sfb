"use client"

import Link from "next/link"
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
    const { data, refetch } = useQuery<IProductRoot>(queryProductById, {
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
        const boolean = [
            !!productById?.category?.id,
            !!productById?.name,
            !!productById?.description,
            !!productById?.price,
            !!productById?.photoListUrl?.length,
        ].every((item) => item === true)
        return boolean
    }, [productById])

    const dataNotCategory = useMemo(() => {
        if (isDataFull) {
            return null
        }
        const obj = {
            category: !productById?.category?.id ? `категории` : null,
            name: !productById?.name ? `названия` : null,
            description: !productById?.description ? `описания` : null,
            price: !productById?.price ? `не установлена цена` : null,
            photoListUrl: !productById?.photoListUrl?.length ? `фотографии` : null,
        }

        return Object.values(obj)
            .filter((item) => !!item)
            .join(", ")
    }, [productById, isDataFull])

    function handlePublish() {
        if (productById?.draft) {
            mutateDraft({
                variables: { productId },
            }).finally(refetch)
        }
    }

    function handleDelete() {
        deleteProduct().finally(() => {
            handlePush(`/my-shop/${id}/merchandise`)
        })
    }

    console.log("productById: ", productById)

    const attrs = useMemo(() => {
        return productById?.attributeList || []
    }, [productById])

    if (!productById) return null

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
            </section>
            {productById?.isActive ? (
                <div data-buttons>
                    {productById?.draft ? (
                        <>
                            {isDataFull ? (
                                <button data-black onClick={handlePublish}>
                                    <span>Опубликовать</span>
                                    <img src="/svg/globe-06.svg" alt="globe-06" width={20} height={20} />
                                </button>
                            ) : (
                                <article>
                                    <p>
                                        Для того, что-бы опубликовать ваш товар, вам не хватает некоторой информации о товаре, а именно:{" "}
                                        <Link href={{ pathname: `/my-shop/${id}/merchandise/${productId}/change` }}>{dataNotCategory}</Link>
                                    </p>
                                </article>
                            )}
                            <Link data-black-border href={{ pathname: `/my-shop/${id}/merchandise/${productId}/change` }}>
                                <span>Редактировать</span>
                                <img src="/svg/replace.svg" alt="replace" width={20} height={20} />
                            </Link>
                        </>
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
