"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { useAuth } from "@/store/state/useAuth"
import { useEnter } from "@/store/state/useEnter"
import { usePush } from "@/helpers/hooks/usePush"

export const ButtonLogin = () => {
    const { dispatch } = useEnter()
    const { state, user } = useAuth()
    const { handlePush } = usePush()

    function handle() {
        dispatch({ visible: true })
    }

    if (state === "Main")
        return (
            <motion.div
                data-profile-link
                initial={{ opacity: 0, visibility: "hidden" }}
                animate={{ opacity: 1, visibility: "visible" }}
                exit={{ opacity: 0, visibility: "hidden" }}
                transition={{ duration: 0.3 }}
                onClick={() => handlePush("/profile")}
            >
                {user?.photo ? (
                    <Image
                        src={user?.photo}
                        alt="avatar"
                        width={45}
                        height={45}
                        unoptimized
                    />
                ) : null}
                {user?.fullName ? <p>{user?.fullName}</p> : <p>Профиль</p>}
            </motion.div>
        )

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
