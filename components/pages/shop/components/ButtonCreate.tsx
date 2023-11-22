"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/buttons.module.scss"

export const ButtonCreate = () => {
    const id = useSearchParams().get("id")
    const [loading, setLoading] = useState(false)
    const { handlePush } = usePush()

    return (
        <button
            className={styles.buttonCreate}
            data-create
            onClick={() => {
                setLoading(true)
                handlePush(id ? `/my-shop/change?id=${id}` : `/my-shop/add`)
            }}
        >
            <span>{id ? "Редактировать" : "Создать"}</span>
            <Image
                src={`/svg/${id ? "edit-05" : "plus-circle"}.svg`}
                alt="plus"
                width={22}
                height={22}
                data-loading={loading}
            />
        </button>
    )
}
