"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"

import { usePush } from "@/helpers/hooks/usePush"

export default function ChangePassword() {
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
                    src="/svg/profile/key.svg"
                    alt="change"
                    width={30}
                    height={30}
                />
                <h2>Изменить пароль</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <span>
                        <input
                            type="email"
                            placeholder="Введите текущий пароль*"
                            {...register("current_password", {
                                required: true,
                            })}
                        />
                    </span>
                    <span>
                        <input
                            type="email"
                            placeholder="Создать пароль*"
                            {...register("new_password", { required: true })}
                        />
                    </span>
                    <span>
                        <input
                            type="email"
                            placeholder="Подтвердить пароль*"
                            {...register("new_2_password", { required: true })}
                        />
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
    current_password: string
    new_password: string
    new_2_password: string
}
