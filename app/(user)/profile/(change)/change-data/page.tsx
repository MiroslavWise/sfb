"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { me, queryCity } from "@/apollo/query"
import { updateProfile } from "@/apollo/mutation"
import { usePush } from "@/helpers/hooks/usePush"
import { uploadFile } from "@/helpers/services/fetch"
import { Input } from "@/components/common/input"
import { Selector } from "@/components/common/selector"
import { useAuth } from "@/store/state/useAuth"

export default function ChangeData() {
    const { setUserData } = useAuth((_) => ({ setUserData: _.setUserData }))
    const { handlePush } = usePush()
    const { data, refetch } = useQuery(me)
    const { data: dataCity } = useQuery(queryCity)
    const [filesString, setFilesString] = useState<string | null>(null)
    const [files, setFiles] = useState<File | null>(null)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
    } = useForm<IValues>()

    useEffect(() => {
        setValue("email", data?.me?.email)
        setValue("phone", data?.me?.phone)
        setValue("fullName", data?.me?.fullName)
        setValue("address", data?.me?.address)
        setValue("city", data?.me?.city?.id)
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
                    cityId: values?.city || null,
                },
            }),
        ]).finally(() => {
            refetch()
                .then((response) => {
                    if (response?.data?.me) {
                        setUserData(response?.data?.me)
                    }
                })
                .finally(() => {
                    requestAnimationFrame(() => {
                        handlePush("/profile")
                    })
                })
        })
    }

    return (
        <>
            <header>
                <Image
                    data-image
                    src="/svg/profile/user-edit.svg"
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
                    <Input
                        label="Имя Фамилия"
                        type="text"
                        {...register("fullName", { required: true })}
                        value={watch("fullName")}
                        onChange={(event) =>
                            setValue("fullName", event.target.value)
                        }
                        error={errors?.fullName ? "Обязательное поле" : null}
                    />

                    <Selector
                        label="Город"
                        options={
                            Array.isArray(dataCity?.cityList)
                                ? dataCity?.cityList?.map((item: any) => ({
                                      label: item?.name,
                                      value: item?.id,
                                  }))
                                : []
                        }
                        {...register("city", { required: false })}
                        value={watch("city")}
                        onChange={(event) =>
                            setValue("city", event.target.value)
                        }
                    />
                    <Selector
                        label="Область"
                        options={
                            Array.isArray(dataCity?.cityList)
                                ? dataCity?.cityList
                                      ?.filter(
                                          (item: any) =>
                                              item?.id === watch("city"),
                                      )
                                      ?.map((item: any) => ({
                                          label: item?.region?.name,
                                          value: item?.region?.id,
                                      }))
                                : []
                        }
                        disabled={!watch("city")}
                        {...register("region", { required: false })}
                        value={watch("region")}
                        onChange={(event) =>
                            setValue("region", event.target.value)
                        }
                    />
                    <Input
                        label="Адрес"
                        type="text"
                        {...register("address", { required: true })}
                        value={watch("address")}
                        onChange={(event) =>
                            setValue("address", event.target.value)
                        }
                        error={errors?.address ? "Обязательное поле" : null}
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register("email")}
                        value={watch("email")}
                        disabled
                        onChange={(event) =>
                            setValue("email", event.target.value)
                        }
                        error={errors?.email ? "Обязательное поле" : null}
                    />
                    <Input
                        label="Номер телефона(11 символов)"
                        type="text"
                        {...register("phone", {
                            required: true,
                            minLength: 11,
                            maxLength: 11,
                        })}
                        value={watch("phone")}
                        onChange={(event) =>
                            setValue("phone", event.target.value)
                        }
                        error={errors?.phone ? "Обязательное поле" : null}
                    />
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
                        type="button"
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
    city: string
    region: string
    email: string
    phone: string
    address: string
}
