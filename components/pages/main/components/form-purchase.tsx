import Image from "next/image"
import { useForm } from "react-hook-form"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useState } from "react"

import type { ICategoriesRoot, IRecommendation, ICategoryRecommendation } from "@/types/types"

import { CustomSelector } from "@/components/common/custom-selector"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { dispatchEnter } from "@/store/state/useEnter"
import { queryCategoriesRoot } from "@/apollo/query"
import { useDebounce } from "@/helpers/hooks/useDebounce"
import { queryCategoryRecommendation } from "@/apollo/attribute"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"
import { createProductRequestSmall, createProductSmall } from "@/apollo/mutation"

export const FormPurchase = ({
    setState,
    state,
}: {
    setState: Dispatch<SetStateAction<"start" | "purchase" | "sale">>
    state: "start" | "purchase" | "sale"
}) => {
    const [filesString, setFilesString] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])
    const token = useAuth(({ token }) => token)
    const [isLoading, setIsLoading] = useState(false)
    const { handlePush } = usePush()
    const { data, loading } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const [createProductRequest] = useMutation(createProductRequestSmall)
    const [createProduct] = useMutation(createProductSmall)
    //
    const [loadingInput, setLoadingInput] = useState(false)
    const [focus, setFocus, ref] = useOutsideClickEvent()
    const [list, setList] = useState<null | IRecommendation[]>(null)
    const debouncedValue = useDebounce(onSearch, 1500)
    const [search, { data: dataCategoryRecommendation }] = useLazyQuery<ICategoryRecommendation>(queryCategoryRecommendation)
    //
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IValues>({ defaultValues: { id: null } })

    function onSubmit(values: IValues) {
        if (!token) {
            dispatchEnter(true)
            return
        }
        if (token && !isLoading) {
            setIsLoading(true)
            if (state === "purchase") {
                createProductRequest({
                    variables: {
                        categoryId: values?.id_ ? values?.id_ : values?.id ? values?.id : null,
                        name: values?.name!,
                    },
                })
                    .then((response) => {
                        if (response?.data) {
                            const id = response?.data?.productRequestCreate?.productRequest?.id
                            Promise.all([
                                ...files.map((item) =>
                                    uploadFile(item, {
                                        type: "product-request/photo-upload/",
                                        id: id,
                                        idType: "product_request_id",
                                    }),
                                ),
                            ]).finally(() => {
                                handlePush(`/my-requests/${id}/change`)
                            })
                        }
                    })
                    .finally(() => {})
            }
            if (state === "sale") {
                createProduct({
                    variables: {
                        categoryId: values?.id_ ? values?.id_ : values?.id ? values?.id : null,
                        name: values?.name!,
                    },
                })
                    .then((response) => {
                        if (response?.data) {
                            const id = response?.data?.productCreate?.product?.id
                            Promise.all([
                                ...files.map((item) =>
                                    uploadFile(item, {
                                        type: "product/photo-upload/",
                                        id: id,
                                        idType: "product_id",
                                    }),
                                ),
                            ]).finally(() => {
                                handlePush(`/my-products/${id}/change`)
                            })
                        }
                    })
                    .finally(() => {})
            }
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

    function onSearch() {
        if (watch("name").length > 2) {
            setLoadingInput(true)
            search({
                variables: {
                    search: watch("name"),
                },
            }).finally(() => {
                setLoadingInput(false)
            })
        }
    }

    function handleOfSearch(values: IValuesSearchOfName) {
        setValue("id", null)
        setValue("id_", null)
        if (data?.categoryRootList?.some((item) => item?.id === values?.category?.id)) {
            const valueId = data?.categoryRootList?.find((item) => item?.id === values?.category?.id)?.id!
            setValue("id", valueId)
        } else if (data?.categoryRootList?.some((item) => item?.childrenList?.some((_item) => _item?.id === values?.category?.id))) {
            const valueFind = data?.categoryRootList?.find((item) =>
                item?.childrenList?.some((_item) => _item?.id === values?.category?.id),
            )
            const valueId = valueFind?.id!
            const valueId_ = valueFind?.childrenList?.find((item) => item?.id === values?.category?.id)?.id!
            setValue("id", valueId)
            setValue("id_", valueId_)
        }
        if (
            data?.categoryRootList?.some((item) =>
                item?.childrenList?.some((_item) => _item?.childrenList?.some((__item) => __item?.id === values?.category?.id)),
            )
        ) {
            const valueFind = data?.categoryRootList?.find((item) =>
                item?.childrenList?.some((_item) => _item?.childrenList?.some((__item) => __item?.id === values?.category?.id)),
            )

            const valueId = valueFind?.id!
            const valueId_ = valueFind?.childrenList?.find((item) => item?.childrenList?.some((item) => item.id === values?.category?.id))
                ?.id!

            setValue("id", valueId)
            setValue("id_", valueId_)
        }
    }

    useEffect(() => {
        if (dataCategoryRecommendation) {
            setList(dataCategoryRecommendation?.categoryRecommendation || null)
        }
    }, [dataCategoryRecommendation?.categoryRecommendation])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <span ref={ref} data-search>
                    <label>Название товара</label>
                    <input
                        disabled={loading}
                        type="text"
                        {...register("name", { required: true, minLength: 5 })}
                        placeholder="Введите название товара"
                        onChange={(event) => {
                            setFocus(true)
                            setValue("name", event.target.value)
                            debouncedValue()
                        }}
                        onFocus={() => setFocus(true)}
                    />
                    {errors.name ? <i>Обязательное поле(мин 5 символов)</i> : null}
                    <img
                        src={loadingInput ? "/svg/loading-03.svg" : "/svg/x-circle.svg"}
                        alt="search-refraction"
                        width={24}
                        height={24}
                        data-img
                        data-loading={loadingInput}
                        data-focus={focus}
                        onClick={() => {
                            if (focus) {
                                setFocus(false)
                            }
                        }}
                    />
                    {list && list?.length && focus ? (
                        <div data-list data-visible={focus}>
                            <ul>
                                {list.map((item) => (
                                    <li
                                        key={`-${item?.id}-pur`}
                                        onClick={() => {
                                            handleOfSearch({
                                                name: item?.name!,
                                                category: {
                                                    id: item?.id!,
                                                    name: item?.name!,
                                                },
                                            })
                                            setFocus(false)
                                        }}
                                    >
                                        <p>{item.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </span>
                <span {...register("id", { required: true })} data-search>
                    <label>Категория товара</label>
                    <CustomSelector
                        label={data?.categoryRootList?.find((item) => item?.id === watch("id"))?.name!}
                        placeholder="Выберите категорию товара"
                        onClick={(value) => {
                            setValue("id", value)
                        }}
                        list={
                            Array.isArray(data?.categoryRootList)
                                ? data?.categoryRootList?.map((item: any) => ({
                                      p: item.name,
                                      id: item.id,
                                  }))!
                                : []
                        }
                    />
                    {errors?.id ? <i>Выберите категорию товара</i> : null}
                </span>
                {data?.categoryRootList?.find((item: any) => item.id === watch("id"))?.childrenList?.length ? (
                    <span data-search {...register("id_", { required: false })}>
                        <CustomSelector
                            label={
                                data?.categoryRootList
                                    ?.find((item: any) => item.id === watch("id"))
                                    ?.childrenList?.find((item) => item?.id === watch("id_"))?.name!
                            }
                            onClick={(value) => {
                                setValue("id_", value)
                            }}
                            list={
                                Array.isArray(data?.categoryRootList)
                                    ? data?.categoryRootList
                                          ?.find((item: any) => item.id === watch("id"))
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
                <span data-file>
                    <input type="file" multiple onChange={handleImageChange} />
                    <label>Нажмите или перетащите фото товара в эту область, чтобы загрузить (.png, .jpeg, .jpg)</label>
                </span>
                {filesString.length ? (
                    <div data-files>
                        {filesString?.map((item) => (
                            <Image key={`${item}-img`} src={item} alt={item} width={500} height={500} unoptimized />
                        ))}
                    </div>
                ) : null}
            </section>
            <div data-buttons>
                <button data-default onClick={() => setState("start")}>
                    <span>Отмена</span>
                </button>
                <button data-primary onClick={() => {}} type="submit">
                    <span>Загрузить и продолжить</span>
                </button>
            </div>
        </form>
    )
}

interface IValues {
    name: string
    id: string | number | null
    id_: string | number | null
    files: File[]
}

interface IValuesSearchOfName {
    name: string
    category: {
        id: string
        name: string
    }
}
