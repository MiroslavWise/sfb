"use client"

import { useSearchParams } from "next/navigation"

import styles from "./page.module.scss"
import { useForm } from "react-hook-form"
import { MiniPhoto } from "@/components/pages/proposals"
import Image from "next/image"
import Select from "react-select"
import { usePush } from "@/helpers/hooks/usePush"
import { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { queryProductRequestById } from "@/apollo/query"

export default function ProposalsChangeUUID() {
    const id = useSearchParams().get("product-id")
    const { data } = useQuery(queryProductRequestById, { variables: { id: id } })
    const { handlePush } = usePush()
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IValues>({})

    function submit(values: IValues) {}

    const onSubmit = handleSubmit(submit)

    function cancel() {
        handlePush(`/proposals`)
    }

    

    useEffect(() => {
        if (!id) {
            return handlePush("/proposals")
        }
    }, [id])

    return (
        <div className={styles.wrapper}>
            <section>
                <h1>Редактировать запрос</h1>
                <form onSubmit={onSubmit}>
                    <h3>Основная информация</h3>
                    <div data-photos {...register("files")}>
                        <div data-input-file>
                            <input type="file" />
                            <Image
                                src="/svg/plus.svg"
                                alt="plus"
                                width={80}
                                height={80}
                            />
                        </div>
                        <MiniPhoto src="/png/b73755ed39aaf014aea297d3aeb25e1d.jpeg" />
                        <MiniPhoto src="/png/b73755ed39aaf014aea297d3aeb25e1d.jpeg" />
                        <MiniPhoto src="/png/b73755ed39aaf014aea297d3aeb25e1d.jpeg" />
                        <MiniPhoto src="/png/b73755ed39aaf014aea297d3aeb25e1d.jpeg" />
                    </div>
                    <span>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Название товара"
                        />
                        {errors.title ? (
                            <i>Обязательно заполните название товара</i>
                        ) : null}
                    </span>
                    <span {...register("category", { required: true })}>
                        <Select
                            className={styles["react-select"]}
                            options={[
                                {
                                    label: "Автозапчасти",
                                    value: "auto",
                                },
                            ]}
                            value={watch("category")!}
                            onChange={(event: any) => {
                                setValue("category", event?.value!)
                            }}
                        />
                        {errors.category ? (
                            <i>Обязательно заполните категорию</i>
                        ) : null}
                    </span>
                    <span {...register("type", { required: true })}>
                        <Select
                            className={styles["react-select"]}
                            options={[
                                {
                                    label: "Автозапчасти",
                                    value: "auto",
                                },
                            ]}
                            value={watch("type")!}
                            onChange={(event: any) => {
                                setValue("type", event?.value!)
                            }}
                        />
                        {errors.type ? (
                            <i>
                                Обязательно заполните модель из предложенного
                                списка
                            </i>
                        ) : null}
                    </span>
                    <span>
                        <textarea
                            placeholder="Описание товара или услуги"
                            {...register("description", { required: false })}
                        />
                    </span>
                    <span>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            placeholder="Цена товара"
                        />
                        {errors.price ? <i>Заполните цену товара</i> : null}
                    </span>
                    <footer>
                        <button data-primary type="submit">
                            <span>Сохранить</span>
                        </button>
                        <button data-default onClick={cancel}>
                            <span>Отмена</span>
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    )
}

interface IValues {
    files: any[]
    title: string
    category: string | number
    type: string | number
    description: string
    price: number | string
}
