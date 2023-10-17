import { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { useEnter } from "@/store/state/useEnter"
import { serviceAuth } from "@/helpers/services/serviceAuth"
import { useAuth } from "@/store/state/useAuth"

export const RegisterFormComponent = () => {
    const { visible, dispatch } = useEnter()
    const { login } = useAuth()
    const {
        register,
        setError,
        setValue,
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
                    login(values?.login?.trim()!, values?.password!).then(
                        () => {
                            dispatch({ visible: false })
                        },
                    )
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
                <input
                    placeholder="Электронная почта"
                    {...register("login", { required: true })}
                    type="email"
                />
                <input
                    placeholder="Телефон"
                    {...register("number", { required: true })}
                    type="text"
                />
                <input
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                    type="password"
                />
                <input
                    placeholder="Пароль"
                    {...register("password_", {
                        required: true,
                        validate: (value) => {
                            if (watch("password") !== value) {
                                return "Ваши пароли не совпадают"
                            }
                        },
                    })}
                    type="password"
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
        </motion.div>
    )
}
