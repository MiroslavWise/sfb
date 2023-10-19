"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"

import styles from "../styles/search-block.module.scss"

export const SearchBlock = () => {
    const { handleSubmit } = useForm({})

    function submit() {}

    const onSubmit = handleSubmit(submit)

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <input placeholder="Поиск по предложениям" />
            <Image
                src="/svg/menu/search-refraction.svg"
                alt="search-refraction"
                width={24}
                height={24}
            />
        </form>
    )
}
