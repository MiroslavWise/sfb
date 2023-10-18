import Select from "react-select"
import { Dispatch, SetStateAction, useId, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"

import { categories } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"
import { usePush } from "@/helpers/hooks/usePush"
import {
    createProductRequestSmall,
    createProductSmall,
} from "@/apollo/mutation"

export const FormPurchase = ({
    setState,
    state,
}: {
    setState: Dispatch<SetStateAction<"start" | "purchase" | "sale">>
    state: "start" | "purchase" | "sale"
}) => {
    const [fileString, setFileString] = useState<string[]>([])
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
                            handlePush(
                                `/my-products/change?product-id=${response?.data?.productCreate?.product?.id}`,
                            )
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
                            handlePush(
                                `/my-requests/change?request-id=${response?.data?.productCreate?.productRequest?.id}`,
                            )
                        }
                    })
                    .finally(() => {})
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
                    <Select
                        {...register("id", { required: true })}
                        options={
                            Array.isArray(data?.categoryList)
                                ? data?.categoryList?.map((item: any) => ({
                                      label: item.name,
                                      value: item.id,
                                  }))
                                : []
                        }
                        isLoading={loading}
                        onChange={(event: any) => {
                            setValue("id", event?.value! || null)
                        }}
                        placeholder="Выберите категорию товара"
                    />
                    {errors?.id ? <i>Выберите категорию товара</i> : null}
                </span>
                {/* <span data-file>
                    <input
                        type="file"
                        multiple
                        {...register("files", { required: false })}
                    />
                    <label>
                        Нажмите или перетащите фото товара в эту область, чтобы
                        загрузить (.png, .jpeg, .jpg)
                    </label>
                </span> */}
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
