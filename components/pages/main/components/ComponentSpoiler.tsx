"use client"

import { useAuth } from "@/store/state/useAuth"
import { dispatchEnter } from "@/store/state/useEnter"

import styles from "../styles/component-spoiler.module.scss"

export const ComponentSpoiler = () => {
    const state = useAuth(({ state }) => state)
    const token = useAuth(({ token }) => token)

    return (
        <div
            className={styles.wrapper}
            data-sign={state === "SignIn" || !token}
        >
            <div data-title>
                <h2>Авторизуйтесь</h2>
                <h4>
                    Что-бы вам предоставлять услуги, пожалуйста, авторизуйтесь
                    или зарегистрируйтесь
                </h4>
            </div>
            <footer>
                <button onClick={() => dispatchEnter(true)}>
                    <span>Войти на сайт</span>
                </button>
            </footer>
        </div>
    )
}
