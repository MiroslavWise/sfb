import { useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { useEnter } from "@/store/state/useEnter"

export const RegisterFormComponent = () => {
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
                    placeholder="Электронная почта или телефон"
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
                    {...register("password_", { required: true })}
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
            <h2>Регистрация покупателя</h2>
            <h3>здесь должен быть текст маркетологи напишут</h3>
        </motion.div>
    )
}
