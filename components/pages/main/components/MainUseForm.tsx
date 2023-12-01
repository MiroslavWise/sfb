"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { FormPurchase } from "./form-purchase"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { dispatchEnter } from "@/store/state/useEnter"

import styles from "../styles/main-use-form.module.scss"

export const ComponentMainUseFormMainPage = () => {
    const [state, setState] = useState<"start" | "purchase" | "sale">("start")
    const token = useAuth(({ token }) => token)
    const { handlePush } = usePush()

    function handleMarket() {
        handlePush(`/market`)
    }

    function handleOnEnter() {
        dispatchEnter(true)
    }

    return (
        <div className={styles.wrapper} data-place>
            {state === "start" ? (
                <motion.div
                    data-null
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                >
                    <article>
                        <img
                            src="/svg/logo.svg"
                            alt="logo"
                            width={130}
                            height={60}
                        />
                        <div data-crumbs>
                            <p>search</p>
                            <img
                                src="/svg/to-right-arrow.svg"
                                alt="to-right-arrow"
                                width={10}
                                height={8.5}
                            />
                            <p>find</p>
                            <img
                                src="/svg/to-right-arrow.svg"
                                alt="to-right-arrow"
                                width={10}
                                height={8.5}
                            />
                            <p>buy</p>
                        </div>
                    </article>
                    <footer>
                        <button
                            data-default
                            onClick={() => setState("purchase")}
                        >
                            <span>Хочу купить</span>
                        </button>
                        <button data-primary onClick={() => setState("sale")}>
                            <span>Хочу продать</span>
                        </button>
                    </footer>
                </motion.div>
            ) : null}
            {state === "purchase" ? (
                <motion.div
                    data-purchase
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                >
                    <header>
                        <h2>Вы покупатель</h2>
                        <h4>введите данные товара, который хотите купить</h4>
                    </header>
                    <FormPurchase setState={setState} state={state} />
                    {/* <ComponentSpoiler /> */}
                </motion.div>
            ) : null}
            {state === "sale" ? (
                !!token ? (
                    <motion.div
                        data-sale
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                        transition={{ duration: 0.3 }}
                    >
                        <header>
                            <h2>Вы продавец</h2>
                            <h4>
                                введите данные товара, который хотите продать
                            </h4>
                        </header>
                        <FormPurchase setState={setState} state={state} />
                        {/* <ComponentSpoiler /> */}
                    </motion.div>
                ) : (
                    <motion.div
                        data-buttons
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div data-main>
                            <button data-fill onClick={handleOnEnter}>
                                <span>
                                    Продать до 10 товаров <i>(Физ. лицо)</i>
                                </span>
                            </button>
                            <button data-fill onClick={handleOnEnter}>
                                <span>
                                    Продать более 10 товаров <i>(Юр. лицо)</i>
                                </span>
                            </button>
                        </div>
                        <button data-default onClick={handleMarket}>
                            <span>Посмотреть товары</span>
                        </button>
                    </motion.div>
                )
            ) : null}
        </div>
    )
}
