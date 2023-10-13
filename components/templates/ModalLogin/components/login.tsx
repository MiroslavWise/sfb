import { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"

export const LoginFormComponent = () => {
    const { visible, dispatch } = useEnter()
    const { login } = useAuth()
    const {
        register,
        setError,
        setValue,
        setFocus,
        handleSubmit,
        formState: { errors },
    } = useForm<IValues>({})

    useEffect(() => {
        if (visible) setFocus("login")
    }, [visible])

    function onSubmit(values: IValues) {
        console.log("login: ", values)
        login(values.login?.trim()!, values?.password?.trim()!).then(
            (response) => {
                console.log("values: ", response)
                if (response.ok) {
                    dispatch({ visible: false })
                    return
                }
                if (!response.ok) {
                    setError("root", {
                        type: "deps",
                        message: "Проверьте, правильно ли введы ваши данные",
                    })
                }
            },
        )
    }

    return (
        <motion.form
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div data-inputs>
                <input
                    placeholder="Электронная почта или телефон"
                    {...register("login", { required: true })}
                    type="email"
                />
                <input
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                    type="password"
                />
                {errors.root ? <i>{errors?.root?.message}</i> : null}
            </div>
            <button type="submit" data-submit>
                <span>Войти</span>
            </button>
        </motion.form>
    )
}

interface IValues {
    login: string
    password: string
}

export const LoginHeaderFooterComponent = () => {
    return (
        <motion.div
            data-header
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
        >
            <h2>Войдите в свой аккаунт</h2>
            <h3>С возвращением! Пожалуйста, введите свои данные справа</h3>
        </motion.div>
    )
}
