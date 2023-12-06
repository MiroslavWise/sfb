"use client"

import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type { IPhotoProductData } from "@/types/types"
import type { ICategoriesRoot, IProductAttributeList, IProductRoot } from "@/types/types"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { TextArea } from "@/components/common/text-area"
import { Checkbox } from "@/components/common/checkbox"
import { CustomSelector } from "@/components/common/custom-selector"

import { useAuth } from "@/store/state/useAuth"
import { queryProductAttributesByCategoryId } from "@/apollo/attribute"
import { createProductFull, mutateUpdateProduct } from "@/apollo/mutation"
import { DELIVERY_TYPE, type TTypeDelivery } from "../constants/delivery-type"
import { queryCategoriesRoot, queryPhotosProductById, queryProductById } from "@/apollo/query"

import styles from "../styles/change.module.scss"

export const MyProductChange = ({ id }: { id: string }) => {
    const user = useAuth(({ user }) => user)
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories, loading: isLoadCategories } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { handlePush } = usePush()
    const [use, { data, loading, refetch }] = useLazyQuery<IProductRoot>(queryProductById, {
        variables: { id },
    })
    const [delivery, setDelivery] = useState<string[]>([])
    const [usePhoto, { data: dataPhotos, refetch: refetchPhotos }] = useLazyQuery<IPhotoProductData>(queryPhotosProductById, {
        variables: { id },
    })
    const [useAttribute, { data: dataAttributes }] = useLazyQuery<IProductAttributeList>(queryProductAttributesByCategoryId)
    const [update] = useMutation(mutateUpdateProduct)
    const [create] = useMutation(createProductFull)
    const { productById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({
        defaultValues: {
            is_files: false,
        },
    })

    function submit(values: IValues) {
        const data: Record<string, any> = {
            categoryId: values.category_ || values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
            quantity: +values.quantity! || 1,
        }
        const attributes = []

        const slugs = Object.entries(values)
            .filter((item) => item?.[0]?.includes("slug:"))
            .forEach((item) => {
                const id = item[0].split(":")[2]
                const slug = item[0].split(":")[1]
                const value = item[1]
            })

        console.log("slugs: ", slugs)

        if (id && id !== "new") {
            data.productId = id!
            Promise.all([
                ...files.map((item) =>
                    uploadFile(item, {
                        type: "product/photo-upload/",
                        id: id!,
                        idType: "product_id",
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
        if (uuid && uuid !== "new") {
            handlePush(`/my-products/${uuid}/`)
        } else {
            handlePush(`/my-products`)
        }
    }

    useEffect(() => {
        if (productById) {
            setValue("title", productById?.name)
            setValue("description", productById?.description)
            setValue("price", productById?.price)
            setValue("quantity", productById?.quantity)
        }
    }, [productById])

    useEffect(() => {
        if (productById && productById?.photoListUrl?.length > 0) {
            setValue("is_files", true)
        }
        if (files.length > 0) {
            setValue("is_files", true)
        }
        if (productById && productById?.photoListUrl?.length === 0 && files.length === 0) {
            setValue("is_files", false)
        }
    }, [productById, files])

    useEffect(() => {
        if (id && id !== "new") {
            use()
            usePhoto()
        }
    }, [id])

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
        if (!!data?.productById && !!dataCategories?.categoryRootList) {
            const categoryId = data?.productById?.category?.id!

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

    useEffect(() => {
        if (watch("category_")) {
            console.log("%c category_: ", "color: green", watch("category_"))
            useAttribute({
                variables: { categoryId: watch("category_") },
            }).then((res) => {
                console.log("%c res", "color: bue", res)
            })
            return
        } else if (watch("category")) {
            console.log("%c category: ", "color: green", watch("category"))
            useAttribute({ variables: { categoryId: watch("category") } }).then((res) => {
                console.log("%c res", "color: bue", res)
            })
            return
        }
    }, [watch("category"), watch("category_")])

    if (loading || isLoadCategories) return null

    if (data?.productById?.author?.id !== user?.id) return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать товар</h1>
                <form onSubmit={onSubmit}>
                    <div data-div-main>
                        <h3>Основная информация</h3>
                        {Array.isArray(dataPhotos?.productById?.photoListUrl) && dataPhotos?.productById?.photoListUrl?.length ? (
                            <div data-photos>
                                {Array.isArray(dataPhotos?.productById?.photoListUrl)
                                    ? dataPhotos?.productById?.photoListUrl
                                          ?.filter((item) => item?.photoUrl)
                                          ?.map((item) => <MiniPhoto src={item.photoUrl} key={item.id + item.photo} />)
                                    : null}
                            </div>
                        ) : null}
                        <div data-photos>
                            <div data-input-file>
                                <input {...register("files")} type="file" multiple onChange={handleImageChange} />
                                <img src="/svg/plus.svg" alt="plus" width={80} height={80} />
                            </div>
                            {filesString?.length && files?.length
                                ? filesString?.map((item, index) => <MiniPhoto src={item} key={`${index}-${item}`} />)
                                : null}
                        </div>
                        <i {...register("is_files", { required: true })}>
                            {errors?.is_files ? "Обязательно наличие хотя-бы одной фотографии" : null}
                        </i>
                        <Input
                            value={watch("title")}
                            label="Название товара"
                            error={errors.title ? "Обязательно заполните название товара" : null}
                            type="text"
                            {...register("title", { required: true })}
                            onChange={(event) => setValue("title", event.target.value)}
                        />
                        <TextArea
                            label="Краткое описание товара"
                            {...register("description", {
                                required: false,
                            })}
                            error={""}
                            value={watch("description")}
                            onChange={(event) => setValue("description", event.target.value)}
                        />
                        <Input
                            value={watch("price")}
                            label="Цена товара"
                            error={errors.price ? "Заполните цену товарa" : null}
                            min={0}
                            type="number"
                            {...register("price", { required: true })}
                            onChange={(event) => setValue("price", event.target.value)}
                        />
                        <Input
                            value={watch("quantity")!}
                            label="Количество товаров"
                            error={errors.quantity}
                            type="number"
                            min={0}
                            {...register("quantity", { required: true })}
                            onChange={(event) => setValue("quantity", event.target.value)}
                        />
                    </div>
                    <div data-div-secondary>
                        <h3>Категория и характеристики товара</h3>
                        <span {...register("category", { required: true })}>
                            <label>Категория товара</label>
                            <CustomSelector
                                label={dataCategories?.categoryRootList?.find((item) => item?.id === watch("category"))?.name!}
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
                                    label={
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
                        {dataAttributes?.productAttributesByCategoryId &&
                            dataAttributes?.productAttributesByCategoryId?.attribute?.map((item) => (
                                <Input
                                    key={`${item.slug}-${item.id}`}
                                    label={item.name}
                                    error={null}
                                    {...register(item.slug)}
                                    value={watch(item.slug)}
                                    onChange={(event) => setValue(`slug:${item.slug}:${item.id}`, event.target.value)}
                                />
                            ))}
                        <span data-delivery>
                            {DELIVERY_TYPE.map((item) => (
                                <Checkbox
                                    key={`${item?.value}-check-`}
                                    label={item.label}
                                    active={delivery.includes(item.value)}
                                    dispatch={() => {
                                        if (delivery.includes(item.value)) {
                                            setDelivery((prev) => prev.filter((_) => _ !== item.value))
                                        } else {
                                            setDelivery((prev) => [...prev, item.value])
                                        }
                                    }}
                                />
                            ))}
                        </span>
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
    files: {
        [key: string]: {
            item: File
            url: string
        }
    }
    is_files: boolean
    title: string
    category: string
    category_: string
    type: string | number
    description: string
    price: number | string
    quantity: number | string
    deliveryType?: TTypeDelivery
    [key: string]: any
}
