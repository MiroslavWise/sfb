"use client"

import { useMemo } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IPhotoProductData, IProductRoot } from "@/types/types"

import { Outline } from "@/components/common/outline"
import { PhotoStage } from "@/components/common/PhotoStage"
import { ButtonBack } from "@/components/common/button-back"
import { TagCategory } from "../../proposals/components/TagCategory"

import { usePush } from "@/helpers/hooks/usePush"
import { mutationCartItemAdd } from "@/apollo/mutation"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/style.module.scss"
import { ICartList } from "@/types/shop"
import { queryCart } from "@/apollo/query-"

export const ProductId = () => {
    const { back, handlePush } = usePush()
    const productId = useSearchParams().get("product-id")
    const { data, loading } = useQuery<IProductRoot>(queryProductById, {
        variables: {
            id: productId,
        },
    })
    const { data: dataPhotos, loading: loadingPhoto } = useQuery<IPhotoProductData>(queryPhotosProductById, {
        variables: {
            id: productId,
        },
    })
    const [useAdd] = useMutation(mutationCartItemAdd, {
        variables: {
            productId: productId,
            quantity: 1,
        },
    })
    const { refetch } = useQuery<ICartList>(queryCart)

    const { isFavorite, handleFavorite, loading: loadingFavorite } = useFavoritesClick()

    const { productById } = data ?? {}

    const images = useMemo(() => {
        if (dataPhotos?.productById?.photoListUrl) {
            return dataPhotos?.productById?.photoListUrl?.map((item, index) => ({ item, index }))
        }

        return []
    }, [dataPhotos?.productById])

    function handle() {
        handleFavorite(productId!)
    }
    function handleAddCart() {
        useAdd().then(() => {
            refetch()
            toast(`Товар добавлен в корзину!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClick() {
                    handlePush("/basket")
                },
            })
        })
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
            </header>
            <section>
                <div data-add-buttons>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            handle()
                        }}
                    >
                        <span>{is ? "Убрать из избранного" : "Добавить в избранное"}</span>
                        <img
                            src={is ? "/svg/heart-fill.svg" : "/svg/heart.svg"}
                            data-loading={loadingFavorite}
                            alt="tag--"
                            width={24}
                            height={24}
                        />
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            handleAddCart()
                        }}
                    >
                        <span>Добавить в корзину</span>
                        <img src="/svg/shopping-cart-01.svg" width={24} height={24} />
                    </button>
                </div>
                <PhotoStage images={images} />
                <article>
                    <Outline label="Описание">
                        <h2>{productById?.description}</h2>
                    </Outline>
                    <Outline label="Категории">
                        <div data-tags>{productById?.category?.id ? <TagCategory text={productById?.category?.name} /> : null}</div>
                    </Outline>
                    <Outline label="Цена">
                        <div data-price-block>
                            <h3>{Number(productById?.price)?.toFixed(0) || 0} ₸</h3>
                        </div>
                    </Outline>
                    <h6>
                        Количество: <span>{productById?.quantity!}</span>
                    </h6>
                    <Outline label={productById?.shop ? "Магазин" : "Продавец"}>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "row",
                                gap: 8,
                            }}
                        >
                            <Image
                                src={productById?.shop ? productById?.shop?.photoUrl! : productById?.author?.photo!}
                                alt="avatar"
                                width={42}
                                height={42}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: 21,
                                    border: productById?.shop ? "1px solid green" : "",
                                }}
                                unoptimized
                            />
                            {productById?.shop ? (
                                <img
                                    src="/svg/check-verified-03.svg"
                                    alt="check-verified"
                                    width={18}
                                    height={18}
                                    style={{
                                        position: "absolute",
                                        top: "calc(100% - 18px)",
                                        left: "calc(42px - 18px)",
                                    }}
                                />
                            ) : null}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                }}
                            >
                                <p>{productById?.shop ? productById?.shop?.name : productById?.author?.fullName}</p>
                                <i style={{ fontSize: 12 }}>
                                    {productById?.shop ? productById?.shop?.address : productById?.author?.address}
                                </i>
                            </div>
                        </div>
                    </Outline>
                </article>
            </section>
        </motion.div>
    )
}
