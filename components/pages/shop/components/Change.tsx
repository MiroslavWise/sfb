"use client"

import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"

import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/style.module.scss"

export const ChangeShop = ({}) => {
    const id = useSearchParams().get("id")
    const { handlePush } = usePush()

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({
        mode: "onChange",
    })

    function submit(values: IValues) {
        handlePush("/my-shop")
    }

    const onSubmit = handleSubmit(submit)

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h3>{id ? "Редактирование магазина" : "Создание магазина"}</h3>
            <Input
                label="Название"
                placeholder="Введите название магазина"
                error={errors.name ? "Введите название" : ""}
                {...register("name", { required: true })}
                value={watch("name")}
                onChange={(event) => setValue("name", event.target.value)}
            />
            <TextArea
                label="Описание"
                placeholder="Чем занимается ваш магазин?"
                error={
                    errors.description ? "Описание - важная часть магазина" : ""
                }
            />
            <Input
                label="Адрес"
                placeholder="Введите адрес магазина"
                error={errors.address ? "Введите адрес магазина" : ""}
                {...register("address", { required: true })}
                value={watch("address")}
                onChange={(event) => setValue("address", event.target.value)}
            />
            <footer>
                <button
                    data-default
                    type="button"
                    onClick={() => {
                        if (id) {
                            handlePush(`/my-shop?id=${id}`)
                        } else {
                            handlePush(`/my-shop`)
                        }
                    }}
                >
                    <span>Отмена</span>
                </button>
                <button data-primary type="submit">
                    <span>Сохранить</span>
                </button>
            </footer>
        </form>
    )
}

interface IValues {
    name: string
    description: string
    address: string
}
