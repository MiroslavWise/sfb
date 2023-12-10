"use client"

import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useLazyQuery } from "@apollo/client"

import type { ICategoriesRoot, IRequestProductRoot } from "@/types/types"

import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"
import { CustomSelector } from "@/components/common/custom-selector"
import { CustomsAttributes } from "@/components/common/customs-attributes"

import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { mutationProductRequestPhotoDelete } from "@/apollo/delete"
import { mutationProductRequestAttributeUpdate } from "@/apollo/attribute"
import { queryCategoriesRoot, queryProductRequestById } from "@/apollo/query"
import { createProductRequestFull, mutateUpdateProductRequest } from "@/apollo/mutation"

import styles from "../styles/change.module.scss"

export const MyRequestsPageChange = ({ id }: { id: string | "new" }) => {
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const { data: dataCategories } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { handlePush } = usePush()
    const [use, { data, refetch }] = useLazyQuery<IRequestProductRoot>(queryProductRequestById, {
        variables: { id },
    })
    const [updateAttr] = useMutation(mutationProductRequestAttributeUpdate)
    const [update] = useMutation(mutateUpdateProductRequest)
    const [deletePhoto] = useMutation(mutationProductRequestPhotoDelete)
    const [create] = useMutation(createProductRequestFull)
    const { productRequestById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues & { [key: string]: string }>({})
    async function submit(values: IValues & { [key: string]: string }) {
        const data: Record<string, any> = {
            categoryId: values.category_ ? values?.category_ : values?.category,
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
            data.productRequestId = id!
            Promise.all([
                ...files.map((item) =>
                    uploadFile(item, {
                        type: "product-request/photo-upload/",
                        id: id!,
                        idType: "product_request_id",
                    }),
                ),
                ...attrs.map((item) =>
                    updateAttr({
                        variables: {
                            productRequestId: id,
                            attrId: Number(item.id),
                            attrValueId: Number(item.value),
                        },
                    }),
                ),
                update({
                    variables: { ...data },
                }),
            ]).then(() => {
                cancel(id)
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
                    ...attrs.map((item) =>
                        updateAttr({
                            variables: {
                                productRequestId: id,
                                attrId: Number(item.id),
                                attrValueId: Number(item.value),
                            },
                        }),
                    ),
                ]).then(() => {
                    cancel(id)
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

    const listAttrs = useMemo(() => {
        return productRequestById?.attributeList || []
    }, [productRequestById])

    useEffect(() => {
        if (listAttrs?.length) {
            listAttrs?.forEach((item) => {
                setValue(`${item.attrId}:attr`, `${item.valueEnumId}`)
            })
        }
    }, [listAttrs])

    function handleDeletePhoto(idPhoto: string) {
        deletePhoto({
            variables: { productRequestId: id, productRequestPhotoId: idPhoto },
        }).finally(refetch)
    }

    if (!productRequestById && id !== "new") return null

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать запрос</h1>
                <form onSubmit={onSubmit}>
                    <section>
                        {Array.isArray(productRequestById?.photoListUrl) && productRequestById?.photoListUrl?.length ? (
                            <div data-photos-change>
                                {Array.isArray(productRequestById?.photoListUrl)
                                    ? productRequestById?.photoListUrl
                                          ?.filter((item) => item?.photoUrl)
                                          ?.map((item) => (
                                              <div data-image key={`${item.id}-$++`}>
                                                  <Image src={item?.photoUrl!} alt={item?.photoUrl!} width={200} height={200} unoptimized />
                                                  <div data-trash onClick={() => handleDeletePhoto(item.id)}>
                                                      <img src="/svg/trash-01.svg" alt="trash" width={24} height={24} />
                                                  </div>
                                              </div>
                                          ))
                                    : null}
                            </div>
                        ) : null}
                        <div data-photos-change>
                            <div data-input-file>
                                <input {...register("files")} type="file" multiple onChange={handleImageChange} />
                                <img src="/svg/plus.svg" alt="plus" width={80} height={80} />
                            </div>
                            {filesString?.length && files?.length
                                ? filesString?.map((item, index) => (
                                      <div data-image key={`${index}-$--uploaded`}>
                                          <Image src={item} alt="load-file" width={200} height={200} unoptimized />
                                          <div
                                              data-trash
                                              onClick={() => {
                                                  setFiles((prev) => prev.filter((_, _i) => index !== _i))
                                                  setFilesString((prev) => prev.filter((_, _i) => index !== _i))
                                              }}
                                          >
                                              <img src="/svg/trash-01.svg" alt="trash" width={24} height={24} />
                                          </div>
                                      </div>
                                  ))
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
                            <CustomsAttributes
                                categoryId={watch("category_")!}
                                {...{
                                    register,
                                    watch,
                                    setValue,
                                }}
                            />
                        </section>
                    </div>
                    <footer>
                        <button data-primary type="submit">
                            <span>Сохранить</span>
                        </button>
                        <Link data-default href={{ pathname: id && id !== "new" ? `/my-requests/${id}/` : `/my-requests` }}>
                            <span>Отмена</span>
                        </Link>
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
