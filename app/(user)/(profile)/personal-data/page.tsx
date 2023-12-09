"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { Input } from "@/components/common/input"

import { me } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"
import { updateProfile } from "@/apollo/mutation"
import { uploadFile } from "@/helpers/services/fetch"

import styles from "@/components/pages/profile/styles/page.module.scss"

export default function PageProfile() {
    const setUserData = useAuth(({ setUserData }) => setUserData)
    const [files, setFiles] = useState<File | null>(null)
    const [filesString, setFilesString] = useState<string | null>(null)
    const { data, refetch } = useQuery(me)
    const [update] = useMutation(updateProfile)
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({})

    useEffect(() => {
        if (data?.me) {
            setValue("fullName", data?.me?.fullName || "")
            setValue("address", data?.me?.address || "")
            setValue("phone", data?.me?.phone || "")
            setValue("email", data?.me?.email)
        }
    }, [data])

    function submit(values: IValues) {
        const data = {
            fullName: values?.fullName,
            address: values?.address,
            phone: values?.phone,
            email: values?.email,
        }

        Promise.all([
            files ? uploadFile(files!, { type: "user/photo-upload/" }) : Promise.resolve(),
            update({
                variables: { ...data },
            }),
        ]).finally(() => {
            refetch().then((response) => {
                if (response?.data?.me) {
                    setUserData(response?.data?.me)
                }
            })
        })
    }

    const onSubmit = handleSubmit(submit)

    return (
        <div className={styles.wrapper}>
            <h3>Данные профиля</h3>
            <form onSubmit={onSubmit}>
                <section data-uploads>
                    {filesString || data?.me?.photo ? (
                        <Image data-photo-avatar src={filesString || data?.me?.photo} alt="avatar" width={200} height={200} unoptimized />
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
                        <img src="/svg/plus.svg" alt="plus" height={50} width={50} />
                    </span>
                </section>
                <Input
                    label="Имя Фамилия"
                    type="text"
                    {...register("fullName", { required: true })}
                    value={watch("fullName")}
                    onChange={(event) => setValue("fullName", event.target.value)}
                    error={errors?.fullName ? "Обязательное поле" : null}
                />
                <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    value={watch("email")}
                    disabled
                    onChange={(event) => setValue("email", event.target.value)}
                    error={errors?.email ? "Обязательное поле" : null}
                />
                <footer>
                    <button type="submit">
                        <span>Сохранить изменения</span>
                    </button>
                </footer>
            </form>
        </div>
    )
}

interface IValues {
    fullName: string
    address: string
    phone: string
    email: string
}
