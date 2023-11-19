"use client"

import { usePathname, useSearchParams } from "next/navigation"

import styles from "../styles/search-bar.module.scss"

import { FilterMain } from "./FilterMain"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

export const SearchBar = () => {
    const pathname = usePathname()
    const search = useSearchParams().get("search")
    const { setValue, handleSubmit, register } = useForm<IValues>({})

    useEffect(() => {
        if (search) {
            setValue("input", search)
        }
    }, [search])

    function submit(values: IValues) {}

    const onSubmit = handleSubmit(submit)

    return pathname !== "/" ? (
        <div className={styles.wrapper}>
            <form data-container onSubmit={onSubmit}>
                <input placeholder="Искать на бирже" {...register("input")} />
                <button data-button-search type="submit">
                    <span>Поиск</span>
                </button>
            </form>
        </div>
    ) : null
}

interface IValues {
    input: string
}
