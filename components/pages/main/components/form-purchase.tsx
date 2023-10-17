import Select from "react-select"
import { Dispatch, SetStateAction, useId, useState } from "react"
import { useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"

import { categories } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"
import { usePush } from "@/helpers/hooks/usePush"

export const FormPurchase = ({
    setState,
}: {
    setState: Dispatch<SetStateAction<"start" | "purchase" | "sale">>
}) => {
    const idProduct = useId()
    const [fileString, setFileString] = useState<string[]>([])
    const { token } = useAuth()
    const { dispatch } = useEnter()
    const { handlePush } = usePush()
    const { data, loading } = useQuery(categories)
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({ defaultValues: { id: null } })

    function onSubmit(values: IValues) {
        if (!token) {
            dispatch({ visible: true })
            return
        }
        if (token) {
            handlePush(`/service-redaction?product-id=${idProduct}`)
        }
    }

    console.log("watch: ", watch("id"))

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
                <span {...register("id", { required: false })}>
                    <Select
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
                <span data-file>
                    <input
                        type="file"
                        multiple
                        {...register("files", { required: false })}
                    />
                    <label>
                        Нажмите или перетащите фото товара в эту область, чтобы
                        загрузить (.png, .jpeg, .jpg)
                    </label>
                </span>
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
