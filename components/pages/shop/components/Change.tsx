"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useLazyQuery, useMutation } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import { Input } from "@/components/common/input"
import { TextArea } from "@/components/common/text-area"

import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { mutationShopCreate, mutationShopUpdate } from "@/apollo/mutation"
import { queryShopById, queryShopList } from "@/apollo/query-"

import styles from "../styles/style.module.scss"
import { IListShop, IShopById } from "@/types/shop"

export const ChangeShop = ({}) => {
    const id = useSearchParams().get("id")
    const { handlePush } = usePush()
    const [files, setFiles] = useState<File | null>(null)
    const [strings, setStrings] = useState<string>("")

    const [create] = useMutation(mutationShopCreate)
    const [update] = useMutation(mutationShopUpdate)
    const [lazyUpdate] = useLazyQuery<IShopById>(queryShopById)
    const [lazyUpdateList] = useLazyQuery<IListShop>(queryShopList)

    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({
        mode: "onChange",
    })

    useEffect(() => {
        if (id) {
            lazyUpdate({ variables: { shopId: id } }).then((response) => {
                if (response?.data) {
                    const data = response?.data?.shopById

                    setValue("name", data?.name || "")
                    setValue("description", data?.description || "")
                    setValue("address", data?.address || "")

                    if (data?.photoUrl) {
                        setStrings(data?.photoUrl!)
                    }
                }
            })
        }
    }, [id])

    function submit(values: IValues) {
        if (id) {
            Promise.all([
                update({
                    variables: {
                        shopId: id,
                        name: values.name?.trim() || "--!!--" + Math.random(),
                        description: values.description?.trim() || "--!!--",
                        $address: values.address?.trim() || "--!!--",
                    },
                }),
                files
                    ? uploadFile(files!, {
                          type: "shop/photo-upload/",
                          idType: "shop_id",
                          id: id,
                      })
                    : Promise.resolve(),
            ]).then((response) => {
                Promise.all([
                    lazyUpdate({ variables: { shopId: id } }),
                    lazyUpdateList(),
                ]).then(() => {
                    handlePush(`/my-shop?id=${id}`)
                })
            })
        } else {
            create({
                variables: {
                    name: values.name?.trim() || "--!!--" + Math.random(),
                    description: values.description?.trim() || "--!!--",
                    address: values.address?.trim() || "--!!--",
                },
            })
                .then((response) => {
                    if (response?.data?.shopCreate?.ok) {
                        const data = response?.data?.shopCreate

                        const push = () => {
                            handlePush(`/my-shop?id=${data?.shop?.id}`)
                        }

                        if (files) {
                            uploadFile(files!, {
                                type: "shop/photo-upload/",
                                idType: "shop_id",
                                id: data?.shop?.id,
                            }).finally(() => {
                                lazyUpdateList().finally(push)
                            })
                        } else {
                            lazyUpdateList().finally(push)
                        }
                    } else {
                        handlePush(`/my-shop`)
                    }
                })
                .catch((error) => {
                    console.log("error: ", error)
                    handlePush(`/my-shop`)
                })
        }
    }

    function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setStrings(reader.result as string)
                    }
                    reader.readAsDataURL(files[i])
                    setFiles(files[i])
                }
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h3>{id ? "Редактирование магазина" : "Создание магазина"}</h3>
            <div data-image>
                {strings ? (
                    <Image
                        src={strings}
                        alt="photo"
                        width={250}
                        height={250}
                        unoptimized
                    />
                ) : (
                    <img
                        src="/svg/plus.svg"
                        alt="plus"
                        width={250}
                        height={250}
                    />
                )}
                <input
                    type="file"
                    multiple={false}
                    onChange={(e) => onChangeFile(e)}
                />
            </div>
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
                {...register("description", { required: true })}
                value={watch("description")}
                onChange={(event) =>
                    setValue("description", event.target.value)
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
                <button data-primary type="submit">
                    <span>Сохранить</span>
                </button>
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
            </footer>
        </form>
    )
}

interface IValues {
    name: string
    description: string
    address: string
}
