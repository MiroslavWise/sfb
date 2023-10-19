import Image from "next/image"
import { useForm } from "react-hook-form"
import { CFormSelect } from "@coreui/react"
import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

import {
    createProductRequestSmall,
    createProductSmall,
} from "@/apollo/mutation"
import { categories } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"

export const FormPurchase = ({
    setState,
    state,
}: {
    setState: Dispatch<SetStateAction<"start" | "purchase" | "sale">>
    state: "start" | "purchase" | "sale"
}) => {
    const [filesString, setFilesString] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])
    const { token } = useAuth()
    const { dispatch } = useEnter()
    const [isLoading, setIsLoading] = useState(false)
    const { handlePush } = usePush()
    const { data, loading } = useQuery(categories)
    const [createProductRequest] = useMutation(createProductRequestSmall)
    const [createProduct] = useMutation(createProductSmall)
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({ defaultValues: { id: null } })

    function onSubmit(values: IValues) {
        console.log("values: ", values)
        if (!token) {
            dispatch({ visible: true })
            return
        }
        if (token && !isLoading) {
            setIsLoading(true)
            if (state === "purchase") {
                createProductRequest({
                    variables: {
                        categoryId: values?.id,
                        name: values?.name!,
                    },
                })
                    .then((response) => {
                        if (response?.data) {
                            const id =
                                response?.data?.productRequestCreate
                                    ?.productRequest?.id
                            Promise.all([
                                ...files.map((item) =>
                                    uploadFile(item, {
                                        type: "product-request/photo-upload/",
                                        id: id,
                                        idType: "product_request_id",
                                    }),
                                ),
                            ]).finally(() => {
                                handlePush(
                                    `/my-requests/change?request-id=${id}`,
                                )
                            })
                        }
                    })
                    .finally(() => {})
            }
            if (state === "sale") {
                createProduct({
                    variables: {
                        categoryId: values?.id,
                        name: values?.name!,
                    },
                })
                    .then((response) => {
                        if (response?.data) {
                            const id =
                                response?.data?.productCreate?.product?.id
                            Promise.all([
                                ...files.map((item) =>
                                    uploadFile(item, {
                                        type: "product/photo-upload/",
                                        id: id,
                                        idType: "product_id",
                                    }),
                                ),
                            ]).finally(() => {
                                handlePush(
                                    `/my-products/change?product-id=${id}`,
                                )
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <span>
                    <input
                        type="text"
                        {...register("name", { required: true, minLength: 5 })}
                        placeholder="Введите название товара"
                    />
                    {errors.name ? (
                        <i>Обязательное поле(мин 5 символов)</i>
                    ) : null}
                </span>
                <span>
                    <CFormSelect
                        {...register("id", { required: true })}
                        options={
                            Array.isArray(data?.categoryList)
                                ? data?.categoryList?.map((item: any) => ({
                                      label: item.name,
                                      value: item.id,
                                  }))
                                : []
                        }
                        placeholder="Выберите категорию товара"
                    />
                    {errors?.id ? <i>Выберите категорию товара</i> : null}
                </span>
                <span data-file>
                    <input type="file" multiple onChange={handleImageChange} />
                    <label>
                        Нажмите или перетащите фото товара в эту область, чтобы
                        загрузить (.png, .jpeg, .jpg)
                    </label>
                </span>
                {filesString.length ? (
                    <div data-files>
                        {filesString?.map((item) => (
                            <Image
                                src={item}
                                alt={item}
                                width={500}
                                height={500}
                                unoptimized
                            />
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
    files: File[]
}
