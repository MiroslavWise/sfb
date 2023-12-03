"use client"

import { useQuery } from "@apollo/client"

import type { IShopById } from "@/types/shop"

import { cx } from "@/helpers/lib/cx"
import { queryShopById } from "@/apollo/query-"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/modules.module.scss"

export const BasicInformation = ({ id }: { id: string }) => {
    const { handlePush } = usePush()

    const { data } = useQuery<IShopById>(queryShopById, {
        variables: { shopId: id },
    })

    return (
        <div className={cx(styles.container, styles.basic)}>
            <h3>Информация о магазине</h3>
            <section>
                {data?.shopById?.photoUrl ? <img src={data?.shopById?.photoUrl!} alt="photo" width={250} height={250} /> : <div data-img />}
                <article>
                    <div data-set>
                        <label>Потверждение:</label>
                        <p>
                            <img src="/svg/check-verified-03.svg" alt="check-verified" width={15} height={15} /> Магазин прошёл верификацию
                            от государственных огранов и имеет право на продажу товаров
                        </p>
                    </div>
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
                </article>
            </section>
            <footer>
                <button
                    onClick={() => {
                        handlePush(`/my-shop/${id}/change`)
                    }}
                >
                    <span>Изменить инфорацию</span>
                </button>
            </footer>
        </div>
    )
}
