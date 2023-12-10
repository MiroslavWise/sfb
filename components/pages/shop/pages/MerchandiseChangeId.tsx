"use client"

import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"

import type { ICategoriesRoot, IProductRoot } from "@/types/types"
import { DELIVERY_TYPE, type TTypeDelivery } from "../../my-product/constants/delivery-type"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"
import { Checkbox } from "@/components/common/checkbox"
import { CustomSelector } from "@/components/common/custom-selector"
import { CustomsAttributes } from "@/components/common/customs-attributes"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { mutateUpdateProduct } from "@/apollo/mutation"
import { mutationProductPhotoDelete } from "@/apollo/delete"
import { mutationProductAttributeUpdate } from "@/apollo/attribute"
import { queryCategoriesRoot, queryProductById } from "@/apollo/query"

import styles from "../styles/page-change.module.scss"

export const MerchandiseChangeId = ({ id, productId }: { id: string; productId: string }) => {
    const user = useAuth(({ user }) => user)
    const { handlePush } = usePush()
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const [delivery, setDelivery] = useState<string[]>([])
    const [loadingF, setLoadingF] = useState(false)
    const { data: dataCategories } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { data, refetch } = useQuery<IProductRoot>(queryProductById, {
        variables: { id: productId },
    })
    const [update] = useMutation(mutateUpdateProduct)
    const [deletePhoto] = useMutation(mutationProductPhotoDelete)
    const [updateAttr] = useMutation(mutationProductAttributeUpdate)
    const { productById } = data ?? {}
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues | { [key: string]: string }>({
        defaultValues: {
            is_files: false,
        },
        reValidateMode: "onChange",
        mode: "onChange",
    })

    function submit(values: IValues | { [key: string]: string }) {
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
        setLoadingF(true)

        data.productId = productId!
        Promise.all([
            ...files.map(
                (item) =>
                    uploadFile(item, {
                        type: "product/photo-upload/",
                        id: productId!,
                        idType: "product_id",
                    }),
                ...attrs.map((item) =>
                    updateAttr({
                        variables: {
                            productId: productId,
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
                console.log("responses data: ", responses)
            })
            .finally(cancel)
    }

    const onSubmit = handleSubmit(submit)

    function cancel() {
        handlePush(`/my-shop/${id}/merchandise/${productId}`)
    }

    useEffect(() => {
        if (productById) {
            setValue("title", productById?.name)
            setValue("description", productById?.description)
            setValue("price", productById?.price)
            setValue("quantity", productById?.quantity)
        }
    }, [productById])

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

    function handleDeletePhoto(idPhoto: string) {
        deletePhoto({ variables: { productId, productPhotoId: idPhoto } }).finally(refetch)
    }

    if (data?.productById?.author?.id !== user?.id) return null

    return (
        <div className={styles.wrapper}>
            <h3>Редактирование товара</h3>
            <form onSubmit={onSubmit}>
                <section>
                    {Array.isArray(productById?.photoListUrl) && productById?.photoListUrl?.length ? (
                        <div data-photos-change>
                            {Array.isArray(productById?.photoListUrl)
                                ? productById?.photoListUrl
                                      ?.filter((item) => item?.photoUrl)
                                      ?.map((item) => (
                                          <div data-image key={item.id}>
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
                    <i {...register("is_files", { required: true })}>
                        {errors?.is_files ? "Обязательно наличие хотя-бы одной фотографии" : null}
                    </i>
                </section>
                <div data-columns>
                    <section data-section-main>
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
                            {...register("price", { required: true, validate: (value) => (Number(value) > 0 ? true : false) })}
                            onChange={(event) => setValue("price", Number(event.target.value))}
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
                    </section>
                    <section data-section-secondary>
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
                        <span>
                            <label>Закреплённый магазин за товаром</label>
                            <p>{productById?.shop?.name}</p>
                        </span>
                        <span data-delivery>
                            <label>Возможные варианты доставки довара, предостовляемые вашим магазином</label>
                            <div>
                                {DELIVERY_TYPE.map((item) => (
                                    <Checkbox
                                        key={`${item?.value}-check-482`}
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
                            </div>
                        </span>
                    </section>
                </div>
                <footer>
                    <button data-primary type="submit">
                        <span>Сохранить</span>
                        {loadingF ? (
                            <img src="/svg/loading-03.svg" alt="loading" width={20} height={20} style={{ filter: `invert(1)` }} />
                        ) : null}
                    </button>
                    <Link data-default href={{ pathname: `/my-shop/${id}/merchandise/${productId}` }}>
                        <span>Отмена</span>
                    </Link>
                </footer>
            </form>
        </div>
    )
}

interface IValues {
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
