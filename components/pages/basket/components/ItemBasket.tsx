import Image from "next/image"

import type { ICart } from "@/types/shop"

import { useAuth } from "@/store/state/useAuth"
import { useFavoritesClick } from "@/helpers/hooks/useFavoritesClick"
import { ButtonDeleteCart } from "@/components/common/button-add-cart"

export const ItemBasket = (props: ICart) => {
    const { token } = useAuth()
    const { product, id, quantity } = props ?? {}
    const { photoListUrl } = product ?? {}

    const { isFavorite, handleFavorite, loading } = useFavoritesClick()

    function handle() {
        handleFavorite(product.id)
    }

    return (
        <li>
            {photoListUrl && photoListUrl?.length ? (
                <Image
                    src={photoListUrl[0]?.photoUrl}
                    alt="photo"
                    width={250}
                    height={250}
                    unoptimized
                />
            ) : (
                <div data-img>
                    <span>Нет фотографий</span>
                </div>
            )}
            <div data-info>
                <h3>{product?.name}</h3>
                <h4>
                    {product?.attributeList
                        ?.map((item) => item?.name)
                        ?.join(", ")}
                </h4>
                <h5>Кол-во товара: {quantity}</h5>
            </div>
            <div data-absolute>
                {token ? (
                    <div
                        data-loading={loading}
                        data-favorite
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            handle()
                        }}
                    >
                        <Image
                            src={
                                isFavorite(product.id!)
                                    ? "/svg/tag-fill.svg"
                                    : "/svg/tag-regular.svg"
                            }
                            alt="tag--"
                            width={25}
                            height={25}
                        />
                        {<ButtonDeleteCart id={id} />}
                    </div>
                ) : null}
            </div>
        </li>
    )
}
