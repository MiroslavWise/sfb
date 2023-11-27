import dayjs from "dayjs"
import { useMemo } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"

import type { IProductListShopManagement } from "@/types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { queryProductListShopManagement } from "@/apollo/query"
import { mutationProductCreate } from "@/apollo/query-"

import styles from "../styles/modules.module.scss"
import { mutateUpdateProductDraft } from "@/apollo/mutation"

export const Merchandise = () => {
    const id = useSearchParams().get("id")
    const { handlePush } = usePush()
    const [update] = useMutation(mutateUpdateProductDraft)
    const { data, refetch } = useQuery<IProductListShopManagement>(
        queryProductListShopManagement,
        {
            variables: { shopId: id },
        },
    )
    const { productListShopManagement } = data ?? {}

    const [create, { loading }] = useMutation(mutationProductCreate, {
        variables: {
            shopId: id,
        },
    })

    function handleCreate() {
        create().then((response) => {
            if (response?.data?.productCreate?.ok) {
                const productId = response?.data?.productCreate?.product?.id

                handlePush(
                    `/my-shop/merchandise/change?product-id=${productId}`,
                )
            }
        })
    }

    const total = useMemo(
        () => productListShopManagement?.totalCount || 0,
        [productListShopManagement],
    )

    const list = useMemo(() => {
        return productListShopManagement?.results || []
    }, [productListShopManagement])

    return (
        <div className={styles.container}>
            <h3>Список товаров</h3>
            <h4>
                Список товаров, относящийся к данному магазину. Вы можете
                зарегистрировать товар, и указывать его актуальность{" "}
                <span>(в будущем данная функция будет автоматизирована)</span>
            </h4>
            <p>Всего товаров в магазине: {total}</p>
            <ul>
                {list?.map((item) => (
                    <li
                        key={`${item?.id}-${item?.shop?.id}`}
                        // onClick={() => {
                        //     handlePush(
                        //         `/my-shop/merchandise?product-id=${item?.id}`,
                        //     )
                        // }}
                    >
                        {item?.photoListUrl[0] ? (
                            <Image
                                src={item?.photoListUrl[0]?.photoUrl!}
                                alt="photo"
                                width={200}
                                height={200}
                                unoptimized
                            />
                        ) : (
                            <div data-img>
                                <p>Фотографий нет</p>
                            </div>
                        )}
                        {item?.draft ? (
                            <div data-hover-button>
                                <button
                                    data-public
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        handlePush(
                                            `/my-shop/merchandise/change?product-id=${item?.id}`,
                                        )
                                    }}
                                >
                                    <span>Редактировать</span>
                                </button>
                                {!!item?.category?.id &&
                                item?.name?.length > 2 &&
                                !!item?.draft &&
                                !!item?.photoListUrl?.length ? (
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            update({
                                                variables: {
                                                    productId: item?.id!,
                                                },
                                            }).finally(refetch)
                                        }}
                                    >
                                        <span>Опубликовать</span>
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                        <div data-draft={item?.draft}>
                            <p>{item?.draft ? "Черновик" : "Опубликован"}</p>
                        </div>
                        <h3>{Number(item?.price)?.toFixed(0) || 0} ₸</h3>
                        <h5>{item?.name}</h5>
                        <a data-city>{item?.city?.name}</a>
                        <div data-time>
                            <img
                                src="/svg/calendar-date.svg"
                                alt="calendar"
                                width={12}
                                height={12}
                            />
                            <a>
                                {dayjs(item?.createdAt).format(
                                    "HH:mm DD.MM.YY",
                                )}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
            <footer>
                <button onClick={handleCreate}>
                    <span>Добавить новый товар</span>
                    <img
                        src="/svg/plus-circle.svg"
                        alt="plus"
                        width={22}
                        height={22}
                        data-loading={loading}
                    />
                </button>
            </footer>
        </div>
    )
}
