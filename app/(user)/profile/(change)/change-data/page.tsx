"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"

import { usePush } from "@/helpers/hooks/usePush"
import { Dayjs } from "dayjs"

export default function ChangeData() {
    const { handlePush } = usePush()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        setValue,
    } = useForm<IValues>({})

    function onSubmit(values: IValues) {
        handlePush("/profile")
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
                <section>
                    <span>
                        <input
                            type="text"
                            data-red={!!errors.username}
                            placeholder="Введите свой ник"
                            {...register("username", {
                                required: true,
                                minLength: 5,
                            })}
                        />
                        {errors.username ? <i>Обязательное поле</i> : null}
                    </span>
                    <div data-row>
                        <span>
                            <input
                                type="text"
                                data-red={!!errors.firsName}
                                placeholder="Введите своё имя"
                                {...register("firsName", { required: true })}
                            />
                            {errors?.firsName ? <i>Обязательное поле</i> : null}
                        </span>
                        <span>
                            <input
                                type="text"
                                placeholder="Введите своё отчество"
                                {...register("middleName", { required: false })}
                            />
                        </span>
                    </div>
                    <div data-row>
                        <span>
                            <input
                                type="text"
                                data-red={!!errors.lastName}
                                placeholder="Введите свою фамилию"
                                {...register("lastName", { required: true })}
                            />
                            {errors?.lastName ? <i>Обязательное поле</i> : null}
                        </span>
                        <span>
                            <input
                                type="text"
                                data-red={!!errors.birthday}
                                placeholder="Введите своё отчество"
                                {...register("birthday", { required: true })}
                            />
                            {errors?.birthday ? <i>Обязательное поле</i> : null}
                        </span>
                    </div>
                    <span>
                        <input
                            type="email"
                            data-red={!!errors?.email}
                            placeholder="Введите свой Email"
                            {...register("email", {
                                required: true,
                                minLength: 5,
                            })}
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
    firsName: string
    lastName: string
    middleName: string
    birthday: Date | Dayjs | string
    country: string
    district: string
    city: string
    email: string
    phone: string
}
