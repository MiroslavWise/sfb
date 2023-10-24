"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"
import { CFormSelect } from "@coreui/react"

import type { IProductRoot } from "@/types/types"
import type { IPhotoProductData } from "@/types/types"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"

import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { createProductFull, mutateUpdateProduct } from "@/apollo/mutation"

import {
    categories,
    queryPhotosProductById,
    queryProductById,
} from "@/apollo/query"

import styles from "../styles/change.module.scss"

export const MyProductPageChange = () => {
    const uuid = useSearchParams().get("product-id")
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories, loading: isLoadCategories } =
        useQuery(categories)
    const { handlePush } = usePush()
    const [use, { data, loading, refetch }] = useLazyQuery<IProductRoot>(
        queryProductById,
        {
            variables: { id: uuid },
        },
    )
    const [usePhoto, { data: dataPhotos, refetch: refetchPhotos }] =
        useLazyQuery<IPhotoProductData>(queryPhotosProductById, {
            variables: { id: uuid },
        })
    const [update] = useMutation(mutateUpdateProduct)
    const [create] = useMutation(createProductFull)
    const { productById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({})

    function submit(values: IValues) {
        const data: Record<string, any> = {
            categoryId: values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
            quantity: +values.quantity! || 1,
        }
        if (uuid) {
            data.productId = uuid!
            Promise.all([
                ...files.map((item) =>
                    uploadFile(item, {
                        type: "product/photo-upload/",
                        id: uuid!,
                        idType: "product_id",
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
                variables: { ...data },
            }).then((response) => {
                const id = response?.data?.productCreate?.product?.id
                Promise.all([
                    ...files.map((item) =>
                        uploadFile(item, {
                            type: "product/photo-upload/",
                            id: id!,
                            idType: "product_id",
                        }),
                    ),
                ]).then(async () => {
                    Promise.all([
                        usePhoto({
                            variables: {
                                id: id,
                            },
                        }),
                        use({
                            variables: {
                                id: id,
                            },
                        }),
                    ]).then(() => {
                        cancel(id)
                    })
                })
            })
        }
    }

    const onSubmit = handleSubmit(submit)

    function cancel(uuid?: string) {
        if (uuid) {
            handlePush(`/my-products?product-id=${uuid}`)
        } else {
            handlePush(`/my-products`)
        }
    }

    useEffect(() => {
        if (productById) {
            setValue("title", productById?.name)
            setValue("description", productById?.description)
            setValue("price", productById?.price)
            setValue("category", productById?.category?.id)
            setValue("quantity", productById?.quantity)
        }
    }, [productById])

    useEffect(() => {
        if (uuid) {
            use()
            usePhoto()
        }
    }, [uuid])

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

    if (loading || isLoadCategories) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать товар</h1>
                <form onSubmit={onSubmit}>
                    <h3>Основная информация</h3>
                    {Array.isArray(dataPhotos?.productById?.photoListUrl) &&
                    dataPhotos?.productById?.photoListUrl?.length ? (
                        <div data-photos>
                            {Array.isArray(
                                dataPhotos?.productById?.photoListUrl,
                            )
                                ? dataPhotos?.productById?.photoListUrl
                                      ?.filter((item) => item?.photoUrl)
                                      ?.map((item) => (
                                          <MiniPhoto
                                              src={item.photoUrl}
                                              key={item.id + item.photo}
                                          />
                                      ))
                                : null}
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
                    <Input
                        value={watch("title")}
                        label="Название товара"
                        error={
                            errors.title
                                ? "Обязательно заполните название товара"
                                : null
                        }
                        type="text"
                        {...register("title", { required: true })}
                        onChange={(event) =>
                            setValue("title", event.target.value)
                        }
                    />
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
                    <Input
                        value={watch("price")}
                        label="Цена товара"
                        error={errors.price ? "Заполните цену товарa" : null}
                        min={0}
                        type="number"
                        {...register("price", { required: true })}
                        onChange={(event) =>
                            setValue("price", event.target.value)
                        }
                    />
                    <Input
                        value={watch("quantity")!}
                        label="Количество товаров"
                        error={errors.quantity}
                        type="number"
                        min={0}
                        {...register("quantity", { required: true })}
                        onChange={(event) =>
                            setValue("quantity", event.target.value)
                        }
                    />
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
    files: {
        [key: string]: {
            item: File
            url: string
        }
    }
    title: string
    category: string | number | null
    type: string | number
    description: string
    price: number | string
    quantity: number | string
}
