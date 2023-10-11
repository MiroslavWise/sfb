import { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { useEnter } from "@/store/state/useEnter"

export const LoginFormComponent = () => {
    const { visible } = useEnter()
    const { register, setError, setValue, setFocus } = useForm<IValues>({})

    useEffect(() => {
        if (visible) setFocus("login")
    }, [visible])

    return (
        <motion.form
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
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
