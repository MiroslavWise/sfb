"use client"

import { useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IPhotoProductData, IProductRoot } from "@/types/types"

import {
    ComponentAddress,
    ComponentArea,
    ComponentCity,
} from "@/components/common/component-regions"
import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { TagAmount } from "@/components/common/tag-amount"
import { ButtonBack } from "@/components/common/button-back"
import { TagCategory } from "../../proposals/components/TagCategory"

import { usePush } from "@/helpers/hooks/usePush"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/style.module.scss"
import { ButtonAddCart } from "@/components/common/button-add-cart"

export const ProductId = () => {
    const { back } = usePush()
    const productId = useSearchParams().get("product-id")
    const { data, loading } = useQuery<IProductRoot>(queryProductById, {
        variables: {
            id: productId,
        },
    })
    const { data: dataPhotos, loading: loadingPhoto } =
        useQuery<IPhotoProductData>(queryPhotosProductById, {
            variables: {
                id: productId,
            },
        })

    const {
        isFavorite,
        handleFavorite,
        loading: loadingFavorite,
    } = useFavoritesClick()

    const { productById } = data ?? {}

    const images = useMemo(() => {
        if (dataPhotos?.productById?.photoListUrl) {
            return dataPhotos?.productById?.photoListUrl?.map(
                (item, index) => ({ item, index }),
            )
        }

        return []
    }, [dataPhotos?.productById])

    function handle() {
        handleFavorite(productId!)
    }

    const is = isFavorite(productId!)

    if (loading || loadingPhoto) return null

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
        >
            <header>
                <div data-title>
                    <ButtonBack onClick={back} />
                    <h1>{productById?.name}</h1>
                </div>
                <div data-add-buttons>
                    <div
                        data-favorite={is}
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            handle()
                        }}
                    >
                        <p>
                            {is
                                ? "Убрать из избранного"
                                : "Добавить в избранное"}
                        </p>
                        <Image
                            src={
                                is
                                    ? "/svg/tag-fill.svg"
                                    : "/svg/tag-regular.svg"
                            }
                            data-loading={loadingFavorite}
                            alt="tag--"
                            width={25}
                            height={25}
                        />
                    </div>
                    <div data-basket>
                        <ButtonAddCart id={productId!} int={1} isTitle />
                    </div>
                </div>
            </header>
            <section>
                <PhotoStage images={images} />
                <article>
                    <Outline label="Описание">
                        <h2>{productById?.description}</h2>
                    </Outline>
                    <Outline label="Категории">
                        <div data-tags>
                            {productById?.category?.id ? (
                                <TagCategory
                                    text={productById?.category?.name}
                                />
                            ) : null}
                        </div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            <h3>
                                {Number(productById?.price)?.toFixed(0) || 0} ₸
                            </h3>
                        </div>
                    </Outline>
                    <Outline label="Количество">
                        <TagAmount count={productById?.quantity!} />
                    </Outline>
                    <Outline label="Адрес">
                        <div data-regions>
                            {data?.productById?.author.city?.region && (
                                <ComponentArea
                                    name={
                                        data?.productById?.author?.city?.region
                                            ?.name
                                    }
                                />
                            )}
                            {data?.productById?.author?.city && (
                                <ComponentCity
                                    name={data?.productById?.author?.city?.name}
                                />
                            )}
                            {data?.productById?.author?.address && (
                                <ComponentAddress
                                    name={data?.productById?.author?.address}
                                />
                            )}
                        </div>
                    </Outline>
                </article>
            </section>
        </motion.div>
    )
}
