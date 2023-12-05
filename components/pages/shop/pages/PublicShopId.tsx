"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePush } from "@/helpers/hooks/usePush"

import type { IShopById } from "@/types/shop"

import { queryShopById } from "@/apollo/query-"

import styles from "../styles/public-shop.module.scss"

export const PublicShopId = ({ id }: { id: string }) => {
    const { back } = usePush()
    const { data } = useQuery<IShopById>(queryShopById, { variables: { shopId: id } })

    return (
        <div className={styles.wrapper}>
            <header>
                <img src="/svg/arrow-left.svg" height={32} width={32} alt="arrow-left" onClick={back} />
                <h3>Информация о магазине</h3>
            </header>
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
                                верификацию от государственных огранов и имеет право на продажу товаров
                            </p>
                        ) : (
                            <p>
                                <img src="/svg/x-circle-red.svg" alt="check-verified" width={15} height={15} /> Магазин не прошёл
                                верификацию от государственных огранов и не имеет приоритета продаж, а так-же гарантии оказываемых услуг на
                                нашей торговой площадке
                            </p>
                        )}
                    </div>
                </article>
            </section>
        </div>
    )
}
