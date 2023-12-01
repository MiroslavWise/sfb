"use client"

import { motion } from "framer-motion"

import { useAuth } from "@/store/state/useAuth"
import { dispatchEnter } from "@/store/state/useEnter"

export const ButtonLogin = () => {
    const state = useAuth(({ state }) => state)

    function handle() {
        dispatchEnter(true)
    }

    if (state === "SignIn")
        return (
            <motion.button
                data-login
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                transition={{ duration: 0.3 }}
                onClick={handle}
            >
                <span>Войти на сайт</span>
            </motion.button>
        )

    return null
}
