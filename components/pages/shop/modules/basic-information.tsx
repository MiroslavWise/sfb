"use client"

import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@apollo/client"

import type { IShopById } from "@/types/shop"

import { cx } from "@/helpers/lib/cx"
import { queryShopById } from "@/apollo/query-"

import styles from "../styles/modules.module.scss"

export const BasicInformation = ({ id }: { id: string }) => {
    const { data } = useQuery<IShopById>(queryShopById, {
        variables: { shopId: id },
    })

    return (
        <div className={cx(styles.container, styles.basic)}>
            <h3>Информация о магазине</h3>
            <section>
                {data?.shopById?.photoUrl ? (
                    <Image src={data?.shopById?.photoUrl!} alt="photo" width={250} height={250} unoptimized />
                ) : (
                    <div data-img />
                )}
                <article>
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
                    <div data-set>
                        <label>Описание:</label>
                        <p>{data?.shopById?.description}</p>
                    </div>
                    <div data-set>
                        <label>Адрес:</label>
                        <p>{data?.shopById?.address}</p>
                    </div>
                </article>
            </section>
            <footer>
                <Link
                    href={{
                        pathname: `/my-shop/${id}/change`,
                    }}
                >
                    <span>Изменить инфорацию</span>
                </Link>
            </footer>
        </div>
    )
}
