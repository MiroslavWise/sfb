"use client"

import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type { ICategoriesRoot, IRequestProductRoot } from "@/types/types"
import type { IPhotoProductRequestData } from "@/types/types"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"
import { CustomSelector } from "@/components/common/custom-selector"

import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { createProductRequestFull, mutateUpdateProductRequest } from "@/apollo/mutation"
import { queryCategoriesRoot, queryPhotosProductRequestById, queryProductRequestById } from "@/apollo/query"

import styles from "../styles/change.module.scss"

export const MyRequestsPageChange = ({ id }: { id: string }) => {
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories, loading: isLoadCategories } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { handlePush } = usePush()
    const [use, { data, loading, refetch }] = useLazyQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id },
    })
    const [usePhoto, { data: dataPhotos, refetch: refetchPhotos }] = useLazyQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
        variables: { id },
    })
    const [update] = useMutation(mutateUpdateProductRequest)
    const [create] = useMutation(createProductRequestFull)
    const { productRequestById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({})
    async function submit(values: IValues) {
        const data: Record<string, any> = {
            categoryId: values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
            quantity: +values.quantity! || 1,
        }
        if (id && id !== "new") {
            data.productRequestId = id!
            Promise.all([
                ...files.map((item) =>
                    uploadFile(item, {
                        type: "product-request/photo-upload/",
                        id: id!,
                        idType: "product_request_id",
                    }),
                ),
                update({
                    variables: { ...data },
                }),
            ]).then(() => {
                Promise.all([refetchPhotos(), refetch()]).then(() => {
                    cancel(id)
                })
            })
        } else {
            create({
                variables: {
                    ...data,
                },
            }).then(async (response) => {
                const id = response?.data?.productRequestCreate?.productRequest?.id
                Promise.all([
                    ...files.map((item) =>
                        uploadFile(item, {
                            type: "product-request/photo-upload/",
                            id: id!,
                            idType: "product_request_id",
                        }),
                    ),
                ]).then(async () => {
                    Promise.all([
                        use({
                            variables: {
                                id: id,
                            },
                        }),
                        usePhoto({
                            variables: {
                                id: id,
                            },
                        }),
                    ]).finally(() => {
                        cancel(id)
                    })
                })
            })
        }
    }

    const onSubmit = handleSubmit(submit)

    function cancel(uuid: string) {
        if (uuid && uuid !== "new") {
            handlePush(`/my-requests/${uuid}/`)
        } else {
            handlePush(`/my-requests`)
        }
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setFilesString((prev) => [...prev, reader.result as string])
                    }
                    reader.readAsDataURL(files[i])
                    setFiles((prev) => [...prev, files[i]])
                }
            }
        }
    }

    useEffect(() => {
        if (productRequestById) {
            setValue("title", productRequestById?.name)
            setValue("description", productRequestById?.description)
            setValue("price", productRequestById?.price)
            setValue("quantity", productRequestById?.quantity)
        }
    }, [productRequestById])

    useEffect(() => {
        if (id && id !== "new") {
            use()
            usePhoto()
        }
    }, [id])

    useEffect(() => {
        if (!!data?.productRequestById && !!dataCategories?.categoryRootList) {
            const categoryId = data?.productRequestById?.category?.id!

            if (dataCategories?.categoryRootList?.some((item) => item?.id === categoryId)) {
                setValue("category", categoryId)
            }

            if (dataCategories?.categoryRootList?.some((item) => item?.childrenList?.some((item_) => item_?.id === categoryId))) {
                const value = dataCategories?.categoryRootList?.find((item) =>
                    item?.childrenList?.some((item_) => item_?.id === categoryId),
                )

                const main = value?.id!
                const secondary = value?.childrenList?.find((item) => item?.id === categoryId)?.id!

                setValue("category", main)
                setValue("category_", secondary)
            }

            if (
                dataCategories?.categoryRootList?.some((item) =>
                    item?.childrenList?.some((item_) => item_?.childrenList?.some((item__) => item__?.id === categoryId)),
                )
            ) {
                const value = dataCategories?.categoryRootList?.find((item) =>
                    item?.childrenList?.some((item_) => item_?.childrenList?.some((item__) => item__?.id === categoryId)),
                )
                const main = value?.id!
                const secondary = value?.childrenList?.find((item) => item?.childrenList?.some((some) => some?.id === categoryId))?.id!

                setValue("category", main)
                setValue("category_", secondary)
            }
        }
    }, [dataCategories, data])

    if (loading || isLoadCategories) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать запрос</h1>
                <form onSubmit={onSubmit}>
                    <section>
                        {Array.isArray(dataPhotos?.productRequestById?.photoListUrl) &&
                        dataPhotos?.productRequestById?.photoListUrl.length ? (
                            <div data-photos>
                                {dataPhotos?.productRequestById?.photoListUrl
                                    ?.filter((item) => item?.photoUrl)
                                    ?.map((item) => (
                                        <MiniPhoto src={item.photoUrl} key={item.id + item.photo + "---343"} />
                                    ))}
                            </div>
                        ) : null}
                        <div data-photos>
                            <div data-input-file>
                                <input {...register("files")} type="file" multiple onChange={handleImageChange} />
                                <img src="/svg/plus.svg" alt="plus" width={80} height={80} />
                            </div>
                            {filesString?.length && files?.length
                                ? filesString?.map((item, index) => <MiniPhoto src={item} key={`${index}-${item}-1234`} />)
                                : null}
                        </div>
                    </section>
                    <div data-columns>
                        <section>
                            <h3>Основная информация</h3>
                            <Input
                                value={watch("title")!}
                                label="Название товара"
                                type="text"
                                {...register("title", { required: true })}
                                error={errors.title ? "Обязательно заполните название товара" : null}
                                onChange={(event) => setValue("title", event.target.value)}
                            />
                            <TextArea
                                label="Краткое описание товара"
                                placeholder="Описание товара или услуги"
                                {...register("description", { required: false })}
                                error={""}
                                value={watch("description")!}
                                onChange={(event) => setValue("description", event.target.value)}
                            />
                            <Input
                                value={watch("price")!}
                                label="Цена товара"
                                type="number"
                                {...register("price", { required: true })}
                                error={errors.price ? "Заполните цену товара" : null}
                                onChange={(event) => setValue("price", event.target.value)}
                            />
                            <Input
                                value={watch("quantity")!}
                                label="Количество товаров"
                                type="number"
                                {...register("quantity", { required: true })}
                                error={errors.quantity ? "Введите кол-во товаров" : null}
                                onChange={(event) => setValue("quantity", event.target.value)}
                            />
                        </section>
                        <section>
                            <h3>Категория и характеристики товара</h3>
                            <span {...register("category", { required: true })}>
                                <CustomSelector
                                    label="Категория товара"
                                    valueTag={dataCategories?.categoryRootList?.find((item) => item?.id === watch("category"))?.name!}
                                    placeholder="Выберите категорию товара"
                                    onClick={(value) => {
                                        setValue("category", value)
                                    }}
                                    list={
                                        Array.isArray(dataCategories?.categoryRootList)
                                            ? dataCategories?.categoryRootList?.map((item: any) => ({
                                                  p: item.name,
                                                  id: item.id,
                                              }))!
                                            : []
                                    }
                                />
                                {errors.category ? <i>Обязательно заполните категорию</i> : null}
                            </span>
                            {dataCategories?.categoryRootList?.find((item: any) => item.id === watch("category"))?.childrenList?.length ? (
                                <span {...register("category_", { required: false })}>
                                    <CustomSelector
                                        label="Подкатегория товара"
                                        valueTag={
                                            dataCategories?.categoryRootList
                                                ?.find((item: any) => item.id === watch("category"))
                                                ?.childrenList?.find((item) => item?.id === watch("category_"))?.name!
                                        }
                                        onClick={(value) => {
                                            setValue("category_", value)
                                        }}
                                        list={
                                            Array.isArray(dataCategories?.categoryRootList)
                                                ? dataCategories?.categoryRootList
                                                      ?.find((item: any) => item.id === watch("category"))
                                                      ?.childrenList?.map((item: any) => ({
                                                          id: item?.id,
                                                          p: item?.name,
                                                      }))!
                                                : []
                                        }
                                        placeholder="Выберите подкатегорию товара"
                                    />
                                </span>
                            ) : null}
                        </section>
                    </div>
                    <footer>
                        <button data-primary type="submit">
                            <span>Сохранить</span>
                        </button>
                        <button data-default onClick={() => cancel(id!)} type="button">
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
    category_?: string
    type: string | number
    description: string
    price: number | string
    quantity: number | string
}
