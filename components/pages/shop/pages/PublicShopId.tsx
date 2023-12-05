"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"

import type { IShopById } from "@/types/shop"

import { queryShopById } from "@/apollo/query-"
import { useTitle } from "@/helpers/hooks/useTitle"

import styles from "../styles/public-shop.module.scss"

export const PublicShopId = ({ id }: { id: string }) => {
    const { data } = useQuery<IShopById>(queryShopById, { variables: { shopId: id } })

    useTitle(data?.shopById?.name)

    return (
        <div className={styles.wrapper}>
            <section>
                {data?.shopById?.photoUrl ? (
                    <Image src={data?.shopById?.photoUrl} alt="avatar" width={300} height={300} unoptimized />
                ) : (
                    <div data-img>
                        <span>Нет фоторгафии</span>
                    </div>
                )}
                <article>
                    <div data-set>
                        <label>Название:</label>
                        <p>{data?.shopById?.name}</p>
                    </div>
                    <div data-set>
                        <label>Описание:</label>
                        <p>{data?.shopById?.description}</p>
                    </div>
                    <div data-set>
                        <label>Адрес:</label>
                        <p>{data?.shopById?.address}</p>
                    </div>
                    <div data-set>
                        <label>Потверждение:</label>
                        {data?.shopById?.confirmation ? (
                            <p>
                                <img src="/svg/check-verified-03.svg" alt="check-verified" width={15} height={15} /> Магазин прошёл
                                верификацию и имеет право на продажу товаров
                            </p>
                        ) : (
                            <p>
                                <img src="/svg/x-circle-red.svg" alt="check-verified" width={15} height={15} /> Магазин не прошёл
                                верификацию и не имеет приоритета продаж, а так-же гарантии оказываемых услуг на нашей торговой площадке
                            </p>
                        )}
                    </div>
                </article>
            </section>
        </div>
    )
}
