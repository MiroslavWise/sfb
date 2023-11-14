"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { CFormSelect } from "@coreui/react"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { CascadeSelect } from "primereact/cascadeselect"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type {
    ICategoryList,
    IProductAttributeList,
    IProductRoot,
} from "@/types/types"
import type { IPhotoProductData } from "@/types/types"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"

import {
    categoriesRoot,
    queryPhotosProductById,
    queryProductById,
} from "@/apollo/query"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import {
    mutationProductAttributeUpdate,
    queryProductAttributesByCategoryId,
} from "@/apollo/attribute"
import { createProductFull, mutateUpdateProduct } from "@/apollo/mutation"
import { DELIVERY_TYPE, type TTypeDelivery } from "../constants/delivery-type"

import styles from "../styles/change.module.scss"
import { Checkbox } from "@/components/common/checkbox"

export const MyProductPageChange = () => {
    const uuid = useSearchParams().get("product-id")
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories, loading: isLoadCategories } =
        useQuery<ICategoryList>(categoriesRoot)
    const { handlePush } = usePush()
    const [use, { data, loading, refetch }] = useLazyQuery<IProductRoot>(
        queryProductById,
        {
            variables: { id: uuid },
        },
    )
    const [delivery, setDelivery] = useState<string[]>([])
    console.log("delivery: ", delivery)
    const [usePhoto, { data: dataPhotos, refetch: refetchPhotos }] =
        useLazyQuery<IPhotoProductData>(queryPhotosProductById, {
            variables: { id: uuid },
        })
    const [useAttribute, { data: dataAttributes }] =
        useLazyQuery<IProductAttributeList>(queryProductAttributesByCategoryId)
    const [update] = useMutation(mutateUpdateProduct)
    const [create] = useMutation(createProductFull)
    const [updateAttr] = useMutation(mutationProductAttributeUpdate)
    const { productById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({
        defaultValues: {
            deliveryType: "self-delivery",
        },
    })

    function submit(values: IValues) {
        console.log("%c slug: values: ", "color: red", values)
        const data: Record<string, any> = {
            categoryId: values.category_ || values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
            quantity: +values.quantity! || 1,
        }
        // updateAttr
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

    const valueCategory = useMemo(() => {
        if (!watch("category") || !dataCategories) return null

        const idCategory = dataCategories?.categoryRootList?.find(
            (item) => item.id === watch("category"),
        )?.id

        if (idCategory) {
            return {
                id: idCategory,
                sub: null,
            }
        }

        if (!idCategory) {
            const idMain = dataCategories?.categoryRootList.find((item) =>
                item?.childrenList?.some(
                    (item_) => item_?.id === watch("category_"),
                ),
            )?.id

            return {
                id: idMain,
                sub: dataCategories?.categoryRootList
                    .find((item) => item.id === idMain)
                    ?.childrenList?.find(
                        (item) => item.id === watch("category_"),
                    )?.id,
            }
        }
    }, [watch("category"), watch("category_"), dataCategories])

    console.log("%c valueCategory: ", "color: #f0f", valueCategory)

    useEffect(() => {
        if (!!data && !!dataCategories) {
            const categoryId = data?.productById?.category?.id!
            if (categoryId) {
                if (
                    dataCategories?.categoryRootList?.find(
                        (item) => item.id === categoryId,
                    )
                ) {
                    setValue("category", categoryId)
                } else {
                    const id = dataCategories?.categoryRootList?.find((item) =>
                        item?.childrenList?.some(
                            (item_) => item_?.id === categoryId,
                        ),
                    )?.id
                    setValue("category", id!)
                    const idSub = dataCategories?.categoryRootList
                        ?.find((item) => item?.id === id)
                        ?.childrenList?.find(
                            (item) => item?.id === categoryId,
                        )?.id
                    setValue("category_", idSub!)
                }
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
            useAttribute({ variables: { categoryId: watch("category") } })
            return
        }
    }, [watch("category"), watch("category_")])

    console.log("%c dataAttributes: ", "color: red", dataAttributes)

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
                                Array.isArray(dataCategories?.categoryRootList)
                                    ? dataCategories?.categoryRootList?.map(
                                          (item: any) => ({
                                              label: item.name,
                                              value: item.id,
                                          }),
                                      )
                                    : []
                            }
                            size="lg"
                            placeholder="Категория товара"
                        />
                        {errors.category ? (
                            <i>Обязательно заполните категорию</i>
                        ) : null}
                    </span>
                    <span>
                        {Array.isArray(
                            dataCategories?.categoryRootList?.find(
                                (item) => item.id === watch("category"),
                            )?.childrenList,
                        ) &&
                        dataCategories?.categoryRootList?.find(
                            (item) => item.id === watch("category"),
                        )?.childrenList?.length ? (
                            <CFormSelect
                                {...register("category_")}
                                options={dataCategories?.categoryRootList
                                    ?.find(
                                        (item) => item.id === valueCategory?.id,
                                    )
                                    ?.childrenList?.map((item) => ({
                                        label: item?.name,
                                        value: item?.id!,
                                    }))}
                                onChange={(event) =>
                                    setValue("category_", event.target.value)
                                }
                                size="lg"
                            />
                        ) : null}
                    </span>
                    <span>
                        <textarea
                            placeholder="Описание товара или услуги"
                            {...register("description", { required: false })}
                        />
                    </span>
                    {dataAttributes?.productAttributesByCategoryId &&
                        dataAttributes?.productAttributesByCategoryId?.attribute?.map(
                            (item) => (
                                <span key={`${item.id}`}>
                                    <Input
                                        label={item.name}
                                        error={null}
                                        {...register(item.slug)}
                                        value={watch(item.slug)}
                                        onChange={(event) =>
                                            setValue(
                                                item.slug,
                                                event.target.value,
                                            )
                                        }
                                    />
                                </span>
                            ),
                        )}
                    <span></span>
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
                    <span data-delivery>
                        {DELIVERY_TYPE.map((item) => (
                            <Checkbox
                                label={item.label}
                                active={delivery.includes(item.value)}
                                dispatch={() => {
                                    if (delivery.includes(item.value)) {
                                        setDelivery((prev) =>
                                            prev.filter(
                                                (_) => _ !== item.value,
                                            ),
                                        )
                                    } else {
                                        setDelivery((prev) => [
                                            ...prev,
                                            item.value,
                                        ])
                                    }
                                }}
                            />
                        ))}
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
    files: {
        [key: string]: {
            item: File
            url: string
        }
    }
    title: string
    category: string | number | null
    category_: string | number | null
    type: string | number
    description: string
    price: number | string
    quantity: number | string
    deliveryType?: TTypeDelivery
    [key: string]: any
}
