import Link from "next/link"

import { IProduct } from "@/types/types"

import Image from "next/image"

import styles from "../styles/item-public-products-id.module.scss"

export const ItemPublicProductsId = (props: IProduct) => {
    const { id, photoListUrl } = props ?? {}
    return (
        <Link href={`/more-details?product-id=${id}`} className={styles.container}>
            {photoListUrl.length > 0 ? (
                <Image src={photoListUrl[0]?.photoUrl} alt="photo" width={270} height={270} unoptimized />
            ) : (
                <div data-img>
                    <span>Нет фотографии</span>
                </div>
            )}
        </Link>
    )
}
