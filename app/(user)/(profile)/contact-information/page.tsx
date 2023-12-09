"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import { me, queryCity } from "@/apollo/query"
import { updateProfile } from "@/apollo/mutation"
import { Input } from "@/components/common/input"
import { Selector } from "@/components/common/selector"
import { useAuth } from "@/store/state/useAuth"

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
    const {
        register: rPhone,
        formState: { errors: errPhone },
        handleSubmit: hPhone,
        setValue: setVPhone,
        watch: wPhone,
    } = useForm<IValuesPhone>()

    useEffect(() => {
        if (data?.me) {
            setValue("address", data?.me?.address)
            setValue("city", data?.me?.city?.id)
            setVPhone("phone", data?.me?.phone)
        }
    }, [data?.me])
    const [update] = useMutation(updateProfile)

    function submitAdress(values: IValuesAdress) {
        update({
            variables: {
                address: values?.address,
                cityId: values?.city || null,
            },
        }).finally(() => {
            refetch().then((response) => {
                if (response?.data?.me) {
                    setUserData(response?.data?.me)
                }
            })
        })
    }

    function submitPhone(values: IValuesPhone) {
        update({
            variables: {
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
    const onSubmitPhone = hPhone(submitPhone)

    return (
        <div className={styles.wrapper}>
            <h3>Контактный телефон</h3>
            <form onSubmit={onSubmitPhone}>
                <section>
                    <Input
                        label="Номер телефона(11 символов)"
                        type="text"
                        {...rPhone("phone", {
                            required: true,
                            minLength: 11,
                            maxLength: 11,
                        })}
                        value={wPhone("phone")}
                        onChange={(event) => setVPhone("phone", event.target.value)}
                        error={errPhone?.phone ? "Обязательное поле" : null}
                    />
                </section>
                <footer>
                    <button type="submit">
                        <span>Сохранить изменения</span>
                    </button>
                </footer>
            </form>
            <div data-divider />
            <h3>Местоположение</h3>
            <form onSubmit={onSubmitAddress}>
                <section>
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
                        onChange={(event: any) => setValue("city", event.target.value)}
                    />
                    <Selector
                        label="Область"
                        options={
                            Array.isArray(dataCity?.cityList)
                                ? dataCity?.cityList
                                      ?.filter((item: any) => item?.id === watch("city"))
                                      ?.map((item: any) => ({
                                          label: item?.region?.name,
                                          value: item?.region?.id,
                                      }))
                                : []
                        }
                        disabled={!watch("city")}
                        {...register("region", { required: false })}
                        value={watch("region")}
                        onChange={(event: any) => setValue("region", event.target.value)}
                    />
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
}
interface IValuesPhone {
    phone: string
}
