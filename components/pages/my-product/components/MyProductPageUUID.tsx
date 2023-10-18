"use client"

import { useSearchParams } from "next/navigation"
import { queryProductById } from "@/apollo/query"
import { usePush } from "@/helpers/hooks/usePush"
import { useMutation, useQuery } from "@apollo/client"
import { mutateUpdateProductDraft } from "@/apollo/mutation"
// import { PhotoStage } from "../../my-requests/components/PhotoStage"

import styles from "../styles/page-uuid.module.scss"
import { TagCategory } from "../../proposals/components/TagCategory"
import Image from "next/image"

export const MyProductPageUUID = () => {
    const uuid = useSearchParams().get("product-id")
    const { handlePush } = usePush()

    const [mutateDraft] = useMutation(mutateUpdateProductDraft)

    const { data, loading, refetch } = useQuery(queryProductById, {
        variables: { id: uuid },
    })
    const { productById } = data ?? {}

    console.log("productById: ", productById)

    function handleChange() {
        handlePush(`/my-products/change?product-id=${uuid}`)
    }

    function handlePublish() {
        if (productById?.draft) {
            mutateDraft({
                variables: {
                    productRequestId: uuid,
                },
            }).finally(() => {
                refetch().finally(() => {})
            })
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                {/* <PhotoStage /> */}
                <div data-description>
                    <div data-sub-description>
                        <div data-title>
                            <h1>{productById?.name}</h1>
                            <p>г. Алматы</p>
                        </div>
                        <div data-tags>
                            {productById?.category?.id ? (
                                <TagCategory
                                    text={productById?.category?.name}
                                />
                            ) : null}
                        </div>
                        <div data-short-description>
                            <h4>
                                Краткое описание <sup>*</sup>
                            </h4>
                            <a>
                                {productById?.description || (
                                    <i>Описания нет</i>
                                )}
                            </a>
                        </div>
                    </div>
                    <div data-author-price>
                        <div data-price-block>
                            <h5>
                                Стоимость <sup>*</sup>
                            </h5>
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
                            {productById?.draft ? (
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
                    </div>
                </div>
            </div>
        </>
    )
}
