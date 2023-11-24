"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"

import { IOrderList } from "@/types/shop"

import { queryOrderList } from "@/apollo/query-"

import styles from "../styles/page.module.scss"

export const DeliveryPage = () => {
    const { data } = useQuery<IOrderList>(queryOrderList)

    return (
        <div className={styles.wrapper}>
            {data?.orderList?.results?.map((item) => (
                <div key={`${item.id}`} data-item-order>
                    <h2>
                        Номер доставки: {item.orderNumber}{" "}
                        <span>(Статус: {item?.status})</span>
                    </h2>
                    <h3>Доставляемый товар</h3>
                    <ul>
                        {item?.cart?.cartItemList?.map((liItem) => (
                            <li key={`${liItem.id}-${item.id}`}>
                                {liItem.product?.photoListUrl?.length ? (
                                    <Image
                                        src={
                                            liItem.product?.photoListUrl[0]
                                                ?.photoUrl!
                                        }
                                        alt="photo"
                                        width={250}
                                        height={250}
                                    />
                                ) : (
                                    <div data-img>
                                        <span>Нет фотографий</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
