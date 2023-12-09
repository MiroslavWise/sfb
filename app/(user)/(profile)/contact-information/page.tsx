"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { Input } from "@/components/common/input"
import { CustomSelector } from "@/components/common/custom-selector"

import { me, queryCity } from "@/apollo/query"
import { useAuth } from "@/store/state/useAuth"
import { updateProfile } from "@/apollo/mutation"

import styles from "@/components/pages/profile/styles/page.module.scss"

export default function ChangeData() {
    const setUserData = useAuth(({ setUserData }) => setUserData)
    const { data, refetch } = useQuery(me)
    const { data: dataCity } = useQuery(queryCity)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
    } = useForm<IValuesAdress>()

    useEffect(() => {
        if (data?.me) {
            setValue("address", data?.me?.address)
            setValue("city", data?.me?.city?.id)
            setValue("phone", data?.me?.phone)
        }
    }, [data?.me])
    const [update] = useMutation(updateProfile)

    function submitAdress(values: IValuesAdress) {
        update({
            variables: {
                address: values?.address,
                cityId: values?.city || null,
                phone: values?.phone || "",
            },
        }).finally(() => {
            refetch().then((response) => {
                if (response?.data?.me) {
                    setUserData(response?.data?.me)
                }
            })
        })
    }

    const onSubmitAddress = handleSubmit(submitAdress)

    return (
        <div className={styles.wrapper}>
            <h3>Контактный телефон и местоположение</h3>
            <form onSubmit={onSubmitAddress}>
                <section>
                    <Input
                        label="Номер телефона(11 символов)"
                        type="text"
                        {...register("phone", {
                            required: true,
                            minLength: 11,
                            maxLength: 11,
                        })}
                        value={watch("phone")}
                        onChange={(event) => setValue("phone", event.target.value)}
                        error={errors?.phone ? "Обязательное поле" : null}
                    />
                    <CustomSelector
                        label="Город"
                        onClick={(value) => {
                            setValue("city", value)
                        }}
                        list={
                            Array.isArray(dataCity?.cityList)
                                ? dataCity?.cityList?.map((item: any) => ({
                                      p: item.name,
                                      id: item.id,
                                  }))!
                                : []
                        }
                        valueTag={dataCity?.cityList?.find((item: any) => item?.id === watch("city"))?.name! || null}
                        placeholder="Выберите ваш город"
                    />
                    {!!watch("city") ? (
                        <CustomSelector
                            label="Область"
                            list={
                                Array.isArray(dataCity?.cityList)
                                    ? dataCity?.cityList
                                          ?.filter((item: any) => item?.id === watch("city"))
                                          ?.map((item: any) => ({
                                              p: item?.region?.name,
                                              id: item?.region?.id,
                                          }))!
                                    : []
                            }
                            valueTag={dataCity?.cityList?.find((item: any) => item?.id === watch("city"))?.region?.name || null}
                            onClick={(value) => {
                                setValue("region", value)
                            }}
                            placeholder="Выберите вашу область"
                        />
                    ) : null}
                    <Input
                        label="Адрес"
                        type="text"
                        {...register("address", { required: true })}
                        value={watch("address")}
                        onChange={(event) => setValue("address", event.target.value)}
                        error={errors?.address ? "Обязательное поле" : null}
                    />
                </section>
                <footer>
                    <button type="submit">
                        <span>Сохранить изменения</span>
                    </button>
                </footer>
            </form>
        </div>
    )
}

interface IValuesAdress {
    city: string
    region: string
    address: string
    phone: string
}
