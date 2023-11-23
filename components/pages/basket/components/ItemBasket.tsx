import type { ICart } from "@/types/shop"
import Image from "next/image"

export const ItemBasket = (props: ICart) => {
    const { product, id, quantity } = props ?? {}
    const { photoListUrl } = product ?? {}

    return (
        <li>
            {photoListUrl && photoListUrl?.length ? (
                <Image
                    src={photoListUrl[0]?.photoUrl}
                    alt="photo"
                    width={250}
                    height={250}
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
        </li>
    )
}
