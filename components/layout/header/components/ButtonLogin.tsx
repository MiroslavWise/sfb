"use client"

import { motion } from "framer-motion"

import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"

export const ButtonLogin = () => {
    const { dispatch } = useEnter((_) => ({ dispatch: _.dispatch }))
    const { state } = useAuth((_) => ({ state: _.state }))

    function handle() {
        dispatch({ visible: true })
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
