"use client"

import { useEffect } from "react"
import Select from "react-select"
import Image from "next/image"
import { useMutation, useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"

import type { IRequestProductRoot } from "../types/types"

import { MiniPhoto } from "../../proposals"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { mutateUpdateProductRequest } from "@/apollo/mutation"
import {
    categories,
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"

import styles from "../styles/change.module.scss"
import { IPhotoRequestData } from "@/types/types"

export const MyRequestsPageChange = () => {
    const uuid = useSearchParams().get("request-id")
    const { data: dataCategories, loading: isLoadCategories } =
        useQuery(categories)
    const { handlePush } = usePush()
    const { data, loading, refetch } = useQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: { id: uuid },
        },
    )
    const { data: dataPhotos, refetch: refetchPhotos } =
        useQuery<IPhotoRequestData>(queryPhotosProductRequestById, {
            variables: { id: uuid },
        })
    const [update] = useMutation(mutateUpdateProductRequest)
    const { productRequestById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({})
    function submit(values: IValues) {
        console.log("values: ", values)
        const data = {
            productRequestId: uuid,
            categoryId: values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
        }
        console.log("values data: ", data)
        update({
            variables: { ...data },
        }).finally(() => {
            refetch().finally(() => {
                cancel()
            })
        })
    }

    const onSubmit = handleSubmit(submit)

    function cancel() {
        handlePush(`/my-requests?request-id=${uuid}`)
    }

    useEffect(() => {
        if (productRequestById) {
            setValue("title", productRequestById?.name)
            setValue("description", productRequestById?.description)
            setValue("price", productRequestById?.price)
            setValue("category", productRequestById?.category?.id)
        }
    }, [productRequestById])

    if (loading || !data) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать запрос</h1>
                <form onSubmit={onSubmit}>
                    <h3>Основная информация</h3>
                    <div data-photos {...register("files")}>
                        <div data-input-file>
                            <input
                                type="file"
                                multiple
                                onChange={(event) => {
                                    if (event?.target && event.target.files) {
                                        const files = event.target.files!
                                        Promise.all([
                                            ...Array.from(files).map((item) =>
                                                uploadFile(item, {
                                                    type: "product-request/photo-upload/",
                                                    id: uuid!,
                                                    idType: "product_request_id",
                                                }),
                                            ),
                                        ]).then((responses) => {
                                            console.log(
                                                "responses: ",
                                                responses,
                                            )
                                            requestAnimationFrame(() => {
                                                refetchPhotos()
                                            })
                                        })
                                    }
                                }}
                            />
                            <Image
                                src="/svg/plus.svg"
                                alt="plus"
                                width={80}
                                height={80}
                            />
                        </div>
                        {Array.isArray(
                            dataPhotos?.productRequestById?.photoListUrl,
                        )
                            ? dataPhotos?.productRequestById?.photoListUrl
                                  ?.filter((item) => item?.photoUrl)
                                  ?.map((item) => (
                                      <MiniPhoto
                                          src={item.photoUrl}
                                          key={item.id + item.photo}
                                      />
                                  ))
                            : null}
                    </div>
                    <span>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Название товара"
                        />
                        {errors.title ? (
                            <i>Обязательно заполните название товара</i>
                        ) : null}
                    </span>
                    <span>
                        <Select
                            {...register("category", { required: true })}
                            className={styles["react-select"]}
                            options={
                                Array.isArray(dataCategories?.categoryList)
                                    ? dataCategories?.categoryList?.map(
                                          (item: any) => ({
                                              label: item.name,
                                              value: item.id,
                                          }),
                                      )
                                    : []
                            }
                            inputValue={
                                dataCategories?.categoryList?.find(
                                    (item: any) =>
                                        item?.id === watch("category"),
                                )?.name!
                            }
                            isLoading={isLoadCategories}
                            onChange={(event: any) => {
                                setValue("category", event?.value!)
                            }}
                            placeholder="Категория товара"
                        />
                        {errors.category ? (
                            <i>Обязательно заполните категорию</i>
                        ) : null}
                    </span>
                    <span>
                        <textarea
                            placeholder="Описание товара или услуги"
                            {...register("description", { required: false })}
                        />
                    </span>
                    <span>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            placeholder="Цена товара"
                        />
                        {errors.price ? <i>Заполните цену товара</i> : null}
                    </span>
                    <footer>
                        <button data-primary type="submit">
                            <span>Сохранить</span>
                        </button>
                        <button data-default onClick={cancel}>
                            <span>Отмена</span>
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    )
}

interface IValues {
    files: any[]
    title: string
    category: string | number | null
    type: string | number
    description: string
    price: number | string
}
