"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { CFormSelect } from "@coreui/react"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type { IRequestProductRoot } from "@/types/types"
import type { IPhotoProductRequestData } from "@/types/types"

import { MiniPhoto } from "../../proposals"

import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import {
    createProductRequestFull,
    mutateUpdateProductRequest,
} from "@/apollo/mutation"
import {
    categories,
    queryPhotosProductRequestById,
    queryProductRequestById,
} from "@/apollo/query"

import styles from "../styles/change.module.scss"

export const MyRequestsPageChange = () => {
    const uuid = useSearchParams().get("request-id")
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories, loading: isLoadCategories } =
        useQuery(categories)
    const { handlePush } = usePush()
    const [use, { data, loading, refetch }] = useLazyQuery<IRequestProductRoot>(
        queryProductRequestById,
        {
            variables: { id: uuid },
        },
    )
    const [usePhoto, { data: dataPhotos, refetch: refetchPhotos }] =
        useLazyQuery<IPhotoProductRequestData>(queryPhotosProductRequestById, {
            variables: { id: uuid },
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
        }
        if (uuid) {
            data.productRequestId = uuid!
            Promise.all([
                ...files.map((item) =>
                    uploadFile(item, {
                        type: "product-request/photo-upload/",
                        id: uuid!,
                        idType: "product_request_id",
                    }),
                ),
                update({
                    variables: { ...data },
                }),
            ]).then(() => {
                Promise.all([refetchPhotos(), refetch()]).then(() => {
                    cancel(uuid)
                })
            })
        } else {
            create({
                variables: {
                    ...data,
                },
            }).then(async (response) => {
                const id =
                    response?.data?.productRequestCreate?.productRequest?.id
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
        if (uuid) {
            handlePush(`/my-requests?request-id=${uuid}`)
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
                        setFilesString((prev) => [
                            ...prev,
                            reader.result as string,
                        ])
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
            setValue("category", productRequestById?.category?.id)
        }
    }, [productRequestById])

    useEffect(() => {
        if (uuid) {
            use()
            usePhoto()
        }
    }, [uuid])

    if (loading || isLoadCategories) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать запрос</h1>
                <form onSubmit={onSubmit}>
                    <h3>Основная информация</h3>
                    {Array.isArray(
                        dataPhotos?.productRequestById?.photoListUrl,
                    ) && dataPhotos?.productRequestById?.photoListUrl.length ? (
                        <div data-photos>
                            {dataPhotos?.productRequestById?.photoListUrl
                                ?.filter((item) => item?.photoUrl)
                                ?.map((item) => (
                                    <MiniPhoto
                                        src={item.photoUrl}
                                        key={item.id + item.photo}
                                    />
                                ))}
                        </div>
                    ) : null}
                    <div data-photos>
                        <div data-input-file>
                            <input
                                {...register("files")}
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                            <Image
                                src="/svg/plus.svg"
                                alt="plus"
                                width={80}
                                height={80}
                            />
                        </div>
                        {filesString?.length && files?.length
                            ? filesString?.map((item, index) => (
                                  <MiniPhoto
                                      src={item}
                                      key={`${index}-${item}`}
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
                        <CFormSelect
                            data-select
                            aria-label="category"
                            {...register("category", { required: true })}
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
                            size="sm"
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
                        <button data-default onClick={() => cancel(uuid!)}>
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