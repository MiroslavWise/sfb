"use client"

import { useState } from "react"
import Image from "next/image"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/buttons.module.scss"

export const ButtonCreate = () => {
    const [loading, setLoading] = useState(false)
    const { handlePush } = usePush()

    return (
        <button
            className={styles.buttonCreate}
            data-create
            onClick={() => {
                setLoading(true)
                handlePush(`/my-shop/add`)
            }}
        >
            <span>Создать</span>
            <Image
                src="/svg/plus-circle.svg"
                alt="plus"
                width={22}
                height={22}
                data-loading={loading}
            />
        </button>
    )
}
