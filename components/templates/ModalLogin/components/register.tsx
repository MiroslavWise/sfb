import { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { InputPassword } from "@/components/common/input-password"

import { useAuth } from "@/store/state/useAuth"
import { MarketButtons } from "./MarketButtons"
import { serviceAuth } from "@/helpers/services/serviceAuth"
import { useEnter, dispatchEnter } from "@/store/state/useEnter"

export const RegisterFormComponent = () => {
    const login = useAuth(({ login }) => login)
    const visible = useEnter(({ visible }) => visible)
    const {
        register,
        setFocus,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm<IValues>({})

    useEffect(() => {
        if (visible) setFocus("login")
    }, [visible])

    function submit(values: IValues) {
        serviceAuth
            .register({
                email: values?.login?.trim()?.toLowerCase()!,
                phone: values?.number?.trim()!,
                password: values?.password?.trim()!,
                isSeller: true,
            })
            .then((response) => {
                if (response?.data?.userRegistration?.ok) {
                    login(values?.login?.trim()!, values?.password!).then(() => {
                        dispatchEnter(false)
                    })
                }
            })
    }

    const omSubmit = handleSubmit(submit)

    return (
        <motion.form
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
            onSubmit={omSubmit}
        >
            <div data-inputs>
                <input placeholder="Электронная почта" {...register("login", { required: true })} type="email" />
                <input placeholder="Телефон" {...register("number", { required: true })} type="text" />
                <InputPassword placeholder="Пароль" {...register("password", { required: true })} />
                <InputPassword
                    placeholder="Пароль"
                    {...register("password_", {
                        required: true,
                        validate: (value) => {
                            if (watch("password") !== value) {
                                return "Ваши пароли не совпадают"
                            }
                        },
                    })}
                    error={errors.password_?.message}
                />
            </div>
            <button type="submit" data-submit>
                <span>Сохранить и прдолжить</span>
            </button>
        </motion.form>
    )
}

interface IValues {
    login: string
    password: string
    password_: string
    number: string
}

export const RegisterHeaderFooterComponent = () => {
    return (
        <motion.div
            data-header
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
        >
            <h2>Регистрация пользователя</h2>
            <h3>здесь должен быть текст маркетологи напишут</h3>
            <MarketButtons />
        </motion.div>
    )
}
