"use client"

import { motion } from "framer-motion"

import { usePush } from "@/helpers/hooks/usePush"

export const HeaderChange = () => {
    const { handlePush } = usePush()

    return (
        <motion.header
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.7 }}
            onClick={() => handlePush("/profile")}
        >
            <img
                src="/svg/arrow-to-left.svg"
                alt="arrow-to-left"
                width={14}
                height={14}
            />
            <p>Назад к профилю</p>
        </motion.header>
    )
}
