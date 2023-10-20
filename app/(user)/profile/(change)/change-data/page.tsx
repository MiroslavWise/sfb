"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import dayjs, { Dayjs } from "dayjs"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { me } from "@/apollo/query"
import { updateProfile } from "@/apollo/mutation"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"

export default function ChangeData() {
    const { handlePush } = usePush()
    const { data, refetch } = useQuery(me)
    const [filesString, setFilesString] = useState<string | null>(null)
    const [files, setFiles] = useState<File | null>(null)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<IValues>()

    useEffect(() => {
        setValue("email", data?.me?.email)
        setValue("phone", data?.me?.phone)
        setValue("fullName", data?.me?.fullName)
        setValue("address", data?.me?.address)
    }, [data?.me])
    const [update] = useMutation(updateProfile)

    function onSubmit(values: IValues) {
        Promise.all([
            files
                ? uploadFile(files!, { type: "user/photo-upload/" })
                : Promise.resolve(),
            update({
                variables: {
                    fullName: values?.fullName,
                    phone: values.phone,
                    address: values?.address,
                },
            }),
        ]).finally(() => {
            refetch().finally(() => {
                handlePush("/profile")
            })
        })
    }

    return (
        <>
            <header>
                <Image
                    data-image
                    src="/svg/profile/change.svg"
                    alt="change"
                    width={30}
                    height={30}
                />
                <h2>Изменить контактные данные</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div data-uploads>
                    {filesString || data?.me?.photo ? (
                        <Image
                            data-photo-avatar
                            src={filesString || data?.me?.photo}
                            alt="avatar"
                            width={200}
                            height={200}
                            unoptimized
                        />
                    ) : null}
                    <span>
                        <input
                            type="file"
                            onChange={(event) => {
                                event.stopPropagation()
                                event.preventDefault()
                                const file = event?.target?.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        setFilesString(reader.result as string)
                                    }
                                    reader.readAsDataURL(file)
                                    setFiles(file as File)
                                }
                            }}
                        />
                        <Image
                            src="/svg/plus.svg"
                            alt="plus"
                            height={50}
                            width={50}
                        />
                    </span>
                </div>
                <section>
                    <span>
                        <input
                            type="text"
                            data-red={!!errors.fullName}
                            placeholder="Введите своё полное имя"
                            {...register("fullName", { required: true })}
                        />
                        {errors?.fullName ? <i>Обязательное поле</i> : null}
                    </span>
                    <span>
                        <input
                            type="text"
                            data-red={!!errors.address}
                            placeholder="Введите свой адресс"
                            {...register("address", { required: true })}
                        />
                        {errors?.address ? <i>Обязательное поле</i> : null}
                    </span>
                    <span>
                        <input
                            type="email"
                            data-red={!!errors?.email}
                            placeholder="Введите свой Email"
                            disabled
                            {...register("email", {})}
                        />
                        {errors?.email ? <i>Обязательное поле</i> : null}
                    </span>
                    <span>
                        <input
                            type="text"
                            data-red={!!errors?.phone}
                            placeholder="Введите свой номер телефона"
                            {...register("phone", {
                                required: true,
                                minLength: 5,
                            })}
                        />
                        {errors.phone ? <i>Обязательное поле</i> : null}
                    </span>
                </section>
                <footer>
                    <button data-primary type="submit">
                        <span>Сохранить</span>
                    </button>
                    <button
                        data-default
                        onClick={() => {
                            handlePush("/profile")
                        }}
                    >
                        <span>Отменить</span>
                    </button>
                </footer>
            </form>
        </>
    )
}

interface IValues {
    username: string
    fullName: string
    birthday: Date | Dayjs | string
    country: string
    district: string
    city: string
    email: string
    phone: string
    address: string
}
