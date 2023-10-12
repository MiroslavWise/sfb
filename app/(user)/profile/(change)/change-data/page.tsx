"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"

import { usePush } from "@/helpers/hooks/usePush"

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
                            type="email"
                            placeholder="Введите свой Email"
                            {...register("email", { required: true })}
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
    email: string
}
