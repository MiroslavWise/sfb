import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"

import type {
    ICategoriesRoot,
    IProductListShopManagement,
    IProductRoot,
} from "@/types/types"
import {
    DELIVERY_TYPE,
    type TTypeDelivery,
} from "../../my-product/constants/delivery-type"

import { MiniPhoto } from "../../proposals"
import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"
import { Checkbox } from "@/components/common/checkbox"
import { CustomSelector } from "@/components/common/custom-selector"

import {
    queryCategoriesRoot,
    queryProductById,
    queryProductListShopManagement,
} from "@/apollo/query"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { mutateUpdateProduct } from "@/apollo/mutation"

import styles from "../styles/page-change.module.scss"

export const MerchandiseChangeId = () => {
    const productId = useSearchParams().get("product-id")
    const { handlePush } = usePush()
    const [files, setFiles] = useState<File[]>([])
    const [filesString, setFilesString] = useState<string[]>([])
    const [delivery, setDelivery] = useState<string[]>([])
    const [loadingF, setLoadingF] = useState(false)
    const { data: dataCategories, loading: isLoadCategories } =
        useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { data, refetch, loading } = useQuery<IProductRoot>(
        queryProductById,
        {
            variables: { id: productId },
        },
    )
    const [update] = useMutation(mutateUpdateProduct)
    const { productById } = data ?? {}
    const { reobserve } = useQuery<IProductListShopManagement>(
        queryProductListShopManagement,
        {
            variables: { shopId: productById?.shop?.id! },
        },
    )
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
        setLoadingF(true)

        data.productId = productId!
        Promise.all([
            ...files.map((item) =>
                uploadFile(item, {
                    type: "product/photo-upload/",
                    id: productId!,
                    idType: "product_id",
                }),
            ),
            update({
                variables: { ...data },
            }),
        ]).then(() => {
            Promise.all([
                refetch(),
                reobserve({ variables: { shopId: productById?.shop?.id! } }),
            ]).finally(() => {
                cancel(productId!)
                setLoadingF(false)
            })
        })
    }

    const onSubmit = handleSubmit(submit)

    function cancel(uuid?: string) {
        handlePush(`/my-shop?id=${productById?.shop?.id}`)
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
        if (productById && productById?.photoListUrl?.length > 0) {
            setValue("is_files", true)
        }
        if (files.length > 0) {
            setValue("is_files", true)
        }
        if (
            productById &&
            productById?.photoListUrl?.length === 0 &&
            files.length === 0
        ) {
            setValue("is_files", false)
        }
    }, [productById, files])

    useEffect(() => {
        if (!!data?.productById && !!dataCategories?.categoryRootList) {
            const categoryId = data?.productById?.category?.id!

            if (
                dataCategories?.categoryRootList?.some(
                    (item) => item?.id === categoryId,
                )
            ) {
                setValue("category", categoryId)
            }

            if (
                dataCategories?.categoryRootList?.some((item) =>
                    item?.childrenList?.some(
                        (item_) => item_?.id === categoryId,
                    ),
                )
            ) {
                const value = dataCategories?.categoryRootList?.find((item) =>
                    item?.childrenList?.some(
                        (item_) => item_?.id === categoryId,
                    ),
                )

                const main = value?.id!
                const secondary = value?.childrenList?.find(
                    (item) => item?.id === categoryId,
                )?.id!

                setValue("category", main)
                setValue("category_", secondary)
            }

            if (
                dataCategories?.categoryRootList?.some((item) =>
                    item?.childrenList?.some((item_) =>
                        item_?.childrenList?.some(
                            (item__) => item__?.id === categoryId,
                        ),
                    ),
                )
            ) {
                const value = dataCategories?.categoryRootList?.find((item) =>
                    item?.childrenList?.some((item_) =>
                        item_?.childrenList?.some(
                            (item__) => item__?.id === categoryId,
                        ),
                    ),
                )
                const main = value?.id!
                const secondary = value?.childrenList?.find((item) =>
                    item?.childrenList?.some((some) => some?.id === categoryId),
                )?.id!

                setValue("category", main)
                setValue("category_", secondary)
            }
        }
    }, [dataCategories, data])

    if (loading || isLoadCategories) return null

    return (
        <div className={styles.wrapper}>
            <h3>Редактирование товара</h3>
            <form onSubmit={onSubmit}>
                <section data-section-main>
                    <h3>Основная информация</h3>
                    {Array.isArray(productById?.photoListUrl) &&
                    productById?.photoListUrl?.length ? (
                        <div data-photos>
                            {Array.isArray(productById?.photoListUrl)
                                ? productById?.photoListUrl
                                      ?.filter((item) => item?.photoUrl)
                                      ?.map((item) => (
                                          <MiniPhoto
                                              src={item.photoUrl}
                                              key={item.id + item.photoUrl}
                                          />
                                      ))
                                : null}
                        </div>
                    ) : null}
                    <div data-photos>
                        <div data-input-file>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                            <img
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
                    <i {...register("is_files", { required: true })}>
                        {errors?.is_files
                            ? "Обязательно наличие хотя-бы одной фотографии"
                            : null}
                    </i>
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
                    <TextArea
                        label="Краткое описание товара"
                        {...register("description", {
                            required: false,
                        })}
                        error={""}
                        value={watch("description")}
                        onChange={(event) =>
                            setValue("description", event.target.value)
                        }
                    />
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
                </section>
                <section data-section-secondary>
                    <h3>Категория и характеристики товара</h3>
                    <span {...register("category", { required: true })}>
                        <label>Категория товара</label>
                        <CustomSelector
                            label={
                                dataCategories?.categoryRootList?.find(
                                    (item) => item?.id === watch("category"),
                                )?.name!
                            }
                            placeholder="Выберите категорию товара"
                            onClick={(value) => {
                                setValue("category", value)
                            }}
                            list={
                                Array.isArray(dataCategories?.categoryRootList)
                                    ? dataCategories?.categoryRootList?.map(
                                          (item: any) => ({
                                              p: item.name,
                                              id: item.id,
                                          }),
                                      )!
                                    : []
                            }
                        />
                        {errors.category ? (
                            <i>Обязательно заполните категорию</i>
                        ) : null}
                    </span>
                    {dataCategories?.categoryRootList?.find(
                        (item: any) => item.id === watch("category"),
                    )?.childrenList?.length ? (
                        <span {...register("category_", { required: false })}>
                            <CustomSelector
                                label={
                                    dataCategories?.categoryRootList
                                        ?.find(
                                            (item: any) =>
                                                item.id === watch("category"),
                                        )
                                        ?.childrenList?.find(
                                            (item) =>
                                                item?.id === watch("category_"),
                                        )?.name!
                                }
                                onClick={(value) => {
                                    setValue("category_", value)
                                }}
                                list={
                                    Array.isArray(
                                        dataCategories?.categoryRootList,
                                    )
                                        ? dataCategories?.categoryRootList
                                              ?.find(
                                                  (item: any) =>
                                                      item.id ===
                                                      watch("category"),
                                              )
                                              ?.childrenList?.map(
                                                  (item: any) => ({
                                                      id: item?.id,
                                                      p: item?.name,
                                                  }),
                                              )!
                                        : []
                                }
                                placeholder="Выберите подкатегорию товара"
                            />
                        </span>
                    ) : null}
                    <b>
                        Скоро будут добавлены возможности заполнения
                        характеристик, такие как: бренд, цвет, размер и т.д. В
                        данный момент мы заполняем базу и тестируем данную
                        механику, что-бы как можно лучше её сделать для
                        конечного потребителя
                    </b>
                    <span>
                        <label>Закреплённый магазин за товаром</label>
                        <p>{productById?.shop?.name}</p>
                    </span>
                    <span data-delivery>
                        <label>
                            Возможные варианты доставки довара, предостовляемые
                            вашим магазином
                        </label>
                        <div>
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
                        </div>
                    </span>
                </section>
                <footer>
                    <button data-primary type="submit">
                        <span>Сохранить</span>
                        {loadingF ? (
                            <img
                                src="/svg/loading-03.svg"
                                alt="loading"
                                width={20}
                                height={20}
                                style={{ filter: `invert(1)` }}
                            />
                        ) : null}
                    </button>
                    <button
                        data-default
                        onClick={() => cancel(productId!)}
                        type="button"
                    >
                        <span>Отмена</span>
                    </button>
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