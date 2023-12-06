"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductData, IProductRoot } from "@/types/types"
import type { IItemTab } from "@/components/common/tabs-details/types"

import { ProposalsMeUUID } from "./ProposalsMeUUID"
import { Outline } from "@/components/common/outline"
import { TabsDetails } from "@/components/common/tabs-details"
import { PhotoStage } from "@/components/common/PhotoStage"
import { ButtonBack } from "@/components/common/button-back"
import { TagCategory } from "../../proposals/components/TagCategory"

import { ITEMS_TABS } from "../constants/tabs"
import { usePush } from "@/helpers/hooks/usePush"
import { queryProductById, queryPhotosProductById } from "@/apollo/query"
import { mutateUpdateProductDraft, mutationProductDelete } from "@/apollo/mutation"

import styles from "../styles/page-uuid.module.scss"

export const MyProductPageUUID = ({ id }: { id: string }) => {
    const { handlePush, handleReplace } = usePush()
    const [tab, setTab] = useState<IItemTab>(ITEMS_TABS[0])

    const [mutateDraft] = useMutation(mutateUpdateProductDraft)
    const [deleteProduct] = useMutation(mutationProductDelete, {
        variables: { productId: id },
    })

    const { data, refetch } = useQuery<IProductRoot>(queryProductById, {
        variables: { id: id },
    })
    const { productById } = data ?? {}
    const { data: dataPhotos } = useQuery<IPhotoProductData>(queryPhotosProductById, {
        variables: { id: id },
    })

    function handleChange() {
        handlePush(`/my-products/${id}/change`)
    }

    function handlePublish() {
        if (productById?.draft) {
            mutateDraft({
                variables: {
                    productId: id,
                },
            }).finally(() => {
                refetch().finally(() => {})
            })
        }
    }

    const images = useMemo(() => {
        if (!dataPhotos?.productById || !Array.isArray(dataPhotos?.productById?.photoListUrl)) {
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
        return !!item?.category?.id && !!item?.name && !!item?.description && !!item?.price && !!item?.photoListUrl?.length
    }, [data?.productById])

    function handleDelete() {
        deleteProduct().finally(() => {
            handleReplace("/my-products")
        })
    }

    const attrs = useMemo(() => {
        return productById?.attributeList || []
    }, [productById])

    if (!productById) return null

    return (
        <div className={styles.wrapper}>
            <header>
                <ButtonBack
                    onClick={() => {
                        handleReplace(`/my-products`)
                    }}
                />
                <h3>{productById?.name}</h3>
            </header>
            <TabsDetails items={ITEMS_TABS} set={setTab} current={tab} />
            {tab.value === "main" ? (
                <section>
                    <PhotoStage images={images} />
                    <article>
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
                    </article>
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
                </section>
            ) : tab.value === "proposals" ? (
                <ProposalsMeUUID />
            ) : tab.value === "testimonials" ? (
                <div />
            ) : null}
        </div>
    )
}
