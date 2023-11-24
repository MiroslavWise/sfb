import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IShopById } from "@/types/shop"

import { queryShopById } from "@/apollo/query-"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/modules.module.scss"

export const BasicInformation = () => {
    const id = useSearchParams().get("id")
    const { handlePush } = usePush()

    const { data } = useQuery<IShopById>(queryShopById, {
        variables: { shopId: id },
    })

    return (
        <div className={styles.container}>
            <h3>Информация о магазине</h3>
            {data?.shopById?.photoUrl ? (
                <img
                    src={data?.shopById?.photoUrl!}
                    alt="photo"
                    width={250}
                    height={250}
                />
            ) : null}
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
            <footer>
                <button
                    onClick={() => {
                        handlePush(`/my-shop/change?id=${id}`)
                    }}
                >
                    <span>Изменить инфорацию</span>
                </button>
            </footer>
        </div>
    )
}
