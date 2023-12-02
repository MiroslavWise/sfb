import { useState } from "react"
import Image from "next/image"
import { useMutation, useQuery } from "@apollo/client"

import type { ICart, ICartList } from "@/types/shop"

import { queryCart } from "@/apollo/query-"
import { useDebounce } from "@/helpers/hooks/useDebounce"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { mutationCartItemDelete, mutationCartItemUpdate } from "@/apollo/mutation"

export const ItemBasket = (props: ICart) => {
    const { product, id, quantity } = props ?? {}
    const { photoListUrl, quantity: quantityProduct } = product ?? {}
    const debounceUpdate = useDebounce(quantityUpdate, 800)
    const [qInt, setQInt] = useState(quantity)

    const { isFavorite, handleFavorite, loading } = useFavoritesClick()

    const { refetch } = useQuery<ICartList>(queryCart)
    const [useDelete] = useMutation(mutationCartItemDelete, {
        variables: {
            cartItemId: id,
        },
    })
    const [updateQuantity] = useMutation(mutationCartItemUpdate)

    function handle() {
        handleFavorite(product.id)
    }

    const is = isFavorite(product.id!)

    function quantityUpdate() {
        console.log("quantityUpdate: ", qInt)
        updateQuantity({
            variables: {
                cartItemId: id,
                quantity: qInt,
            },
        }).then((response) => {
            refetch()
            console.log("quantityUpdate response: ", response?.data)
        })
    }

    return (
        <li>
            {photoListUrl && photoListUrl?.length ? (
                <Image src={photoListUrl[0]?.photoUrl} alt="photo" width={250} height={250} unoptimized />
            ) : (
                <div data-img>
                    <span>Нет фотографий</span>
                </div>
            )}
            <section>
                <div data-info>
                    <h3>{product?.name}</h3>
                    <h4>{product?.attributeList?.map((item) => item?.name)?.join(", ")}</h4>
                    <h5>Кол-во товара: {quantity}</h5>
                    <p>Стоимость: {(+product?.price * quantity)?.toFixed(0)} ₸</p>
                </div>
                <div data-quantity>
                    <div
                        data-count-i
                        style={{ borderRadius: `7px 0 0 7px` }}
                        onClick={(event) => {
                            event.stopPropagation()
                            setQInt((prev) => (prev <= 1 ? 1 : prev - 1))
                            debounceUpdate()
                        }}
                    >
                        <span>-</span>
                    </div>
                    <div data-count>
                        <span>{qInt}</span>
                    </div>
                    <div
                        data-count-i
                        style={{ borderRadius: `0 7px 7px 0` }}
                        onClick={(event) => {
                            event.stopPropagation()
                            setQInt((prev) => (prev >= quantityProduct ? quantityProduct : prev + 1))
                            debounceUpdate()
                        }}
                    >
                        <span>+</span>
                    </div>
                </div>
                <div data-absolute>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            handle()
                        }}
                    >
                        <span>{is ? "Убрать из избранного" : "Добавить в избранное"}</span>
                        <img
                            data-loading={loading}
                            src={is ? "/svg/heart-fill.svg" : "/svg/heart.svg"}
                            alt="--heart--"
                            width={25}
                            height={25}
                        />
                    </button>
                    <button
                        data-cart
                        onClick={() => {
                            useDelete().finally(() => {
                                refetch()
                            })
                        }}
                    >
                        <span>Удалить из корзины</span>
                        <img className="animate__animated animate__jello" src="/svg/shopping-cart-01-red.svg" width={30} height={25} />
                    </button>
                </div>
            </section>
        </li>
    )
}
