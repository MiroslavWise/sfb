"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { LoginFormComponent, LoginHeaderFooterComponent } from "./components/login"
import { RegisterFormComponent, RegisterHeaderFooterComponent } from "./components/register"

import { useEnter, dispatchEnter } from "@/store/state/useEnter"

import styles from "./styles/style.module.scss"

export const ModalLogin = () => {
    const visible = useEnter(({ visible }) => visible)
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        console.log("useEffect visible")
    }, [])

    return visible ? (
        <motion.div
            className={styles.wrapper}
            data-visible={visible}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.5 }}
        >
            <motion.section
                initial={{ opacity: 0, visibility: "hidden", top: "20%" }}
                animate={{ opacity: 1, visibility: "visible", top: "50%" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                transition={{ duration: 0.4 }}
            >
                <img src="/svg/x-close.svg" alt="x-close" width={24} height={24} data-close onClick={() => dispatchEnter(false)} />
                <article>
                    {isLogin ? <LoginHeaderFooterComponent /> : <RegisterHeaderFooterComponent />}
                    <img src="/svg/logo.svg" alt="logo" width={54} height={25} />
                </article>
                <div data-forms>
                    <nav>
                        <a data-active={isLogin} onClick={() => setIsLogin(true)}>
                            Войти на сайт
                        </a>
                        <a data-active={!isLogin} onClick={() => setIsLogin(false)}>
                            Зарегистрироваться
                        </a>
                    </nav>
                    {isLogin ? <LoginFormComponent /> : <RegisterFormComponent />}
                </div>
            </motion.section>
        </motion.div>
    ) : null
}
