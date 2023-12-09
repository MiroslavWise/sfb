"use client"

import { useForm } from "react-hook-form"

import { usePush } from "@/helpers/hooks/usePush"
import { InputPassword } from "@/components/common/input-password"

import styles from "@/components/pages/profile/styles/page.module.scss"

export default function ChangePassword() {
    const { handlePush } = usePush()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        setValue,
        watch,
    } = useForm<IValues>({})

    function onSubmit(values: IValues) {
        // handlePush("/profile")
    }
    return (
        <div className={styles.wrapper}>
            <h3>Безопастность и пароль</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <InputPassword
                        placeholder="Введите текущий пароль*"
                        {...register("current_password", {
                            required: true,
                        })}
                        error={errors?.current_password?.message}
                    />
                    <InputPassword placeholder="Создать пароль*" {...register("new_password", { required: true })} />
                    <InputPassword
                        placeholder="Подтвердить пароль*"
                        {...register("new_2_password", {
                            required: true,
                            validate: (value) => {
                                if (watch("new_password") !== value) {
                                    return "Ваши пароли не совпадают"
                                }
                            },
                        })}
                        error={errors?.new_2_password?.message}
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

interface IValues {
    current_password: string
    new_password: string
    new_2_password: string
}
