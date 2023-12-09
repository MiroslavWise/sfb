"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type { ICategoriesRoot, IProductRoot } from "@/types/types"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { TextArea } from "@/components/common/text-area"
import { Checkbox } from "@/components/common/checkbox"
import { CustomSelector } from "@/components/common/custom-selector"
import { CustomsAttributes } from "@/components/common/customs-attributes"

import { useAuth } from "@/store/state/useAuth"
import { mutationProductAttributeUpdate } from "@/apollo/attribute"
import { queryCategoriesRoot, queryProductById } from "@/apollo/query"
import { createProductFull, mutateUpdateProduct } from "@/apollo/mutation"
import { DELIVERY_TYPE, type TTypeDelivery } from "../constants/delivery-type"

import styles from "../styles/change.module.scss"

export const MyProductChange = ({ id }: { id: string }) => {
    const user = useAuth(({ user }) => user)
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { handlePush } = usePush()
    const [use, { data }] = useLazyQuery<IProductRoot>(queryProductById, {
        variables: { id },
    })
    const [delivery, setDelivery] = useState<string[]>([])
    const [updateAttr] = useMutation(mutationProductAttributeUpdate)
    const [update] = useMutation(mutateUpdateProduct)
    const [create] = useMutation(createProductFull)
    const { productById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues | { [key: string]: any }>({
        defaultValues: {
            is_files: false,
        },
    })

    function submit(values: IValues | { [key: string]: any }) {
        const data: Record<string, any> = {
            categoryId: values.category_ || values.category,
            name: values.title,
            description: values.description,
            price: +values.price,
            quantity: +values.quantity! || 1,
        }

        const attrs = Object.entries(values)
            ?.filter((item) => item[0]?.includes(`:attr`))
            ?.filter((item) => ["string", "number"].includes(typeof item[1]) && item[1])
            ?.map((item) => ({
                id: item[0].replace(":attr", ""),
                value: item[1],
            }))

        if (id && id !== "new") {
            data.productId = id!
            Promise.all([
                ...files.map(
                    (item) =>
                        uploadFile(item, {
                            type: "product/photo-upload/",
                            id: id!,
                            idType: "product_id",
                        }),
                    ...attrs.map((item) =>
                        updateAttr({
                            variables: {
                                productId: id,
                                attrId: Number(item.id),
                                attrValueId: Number(item.value),
                            },
                        }),
                    ),
                ),
                update({
                    variables: { ...data },
                }),
            ])
                .then((responses) => {
                    console.log("responses: ", responses)
                })
                .finally(cancel)
        } else {
            create({
                variables: { ...data },
            })
                .then((response) => {
                    const id = response?.data?.productCreate?.product?.id
                    Promise.all([
                        ...files.map((item) =>
                            uploadFile(item, {
                                type: "product/photo-upload/",
                                id: id!,
                                idType: "product_id",
                            }),
                        ),
                        ...attrs.map((item) =>
                            updateAttr({
                                variables: {
                                    productId: id,
                                    attrId: Number(item.id),
                                    attrValueId: Number(item.value),
                                },
                            }),
                        ),
                    ])
                        .then((responses) => {
                            console.log("responses: ", responses)
                        })
                        .finally(() => {
                            handlePush(`/my-products/${id}/`)
                        })
                })
                .catch((error) => {
                    console.warn(`ERROR CREATE PRODUCT: `, error)
                    cancel()
                })
        }
    }

    const onSubmit = handleSubmit(submit)

    function cancel() {
        if (id && id !== "new") {
            handlePush(`/my-products/${id}/`)
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

    const listAttrs = useMemo(() => {
        return productById?.attributeList || []
    }, [productById])

    useEffect(() => {
        if (listAttrs?.length) {
            listAttrs?.forEach((item) => {
                setValue(`${item.attrId}:attr`, `${item.valueEnumId}`)
            })
        }
    }, [listAttrs])

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
            return
        } else if (watch("category")) {
            console.log("%c category: ", "color: green", watch("category"))
            return
        }
    }, [watch("category"), watch("category_")])

    if (data?.productById?.author?.id !== user?.id && id !== "new") return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать товар</h1>
                <form onSubmit={onSubmit}>
                    <section>
                        {Array.isArray(productById?.photoListUrl) && productById?.photoListUrl?.length ? (
                            <div data-photos>
                                {Array.isArray(productById?.photoListUrl)
                                    ? productById?.photoListUrl
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
                    </section>
                    <article>
                        <div data-div-main>
                            <h3>Основная информация</h3>
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
                            <CustomsAttributes
                                categoryId={watch("category_")!}
                                {...{
                                    register,
                                    watch,
                                    setValue,
                                }}
                            />
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
                    </article>
                    <footer>
                        <button data-primary type="submit">
                            <span>Сохранить</span>
                        </button>
                        <Link data-default href={{ pathname: id && id !== "new" ? `/my-products/${id}/` : `/my-products` }}>
                            <span>Отмена</span>
                        </Link>
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
}
