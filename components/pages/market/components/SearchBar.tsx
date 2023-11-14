"use client"

import { usePathname } from "next/navigation"

import styles from "../styles/search-bar.module.scss"

import { FilterMain } from "./FilterMain"

export const SearchBar = () => {
    const pathname = usePathname()

    return pathname !== "/" ? (
        <div className={styles.wrapper}>
            <div data-container>
                <input placeholder="Искать на бирже" />
                <button data-button-search>
                    <span>Поиск</span>
                </button>
            </div>
            <div data-main-filter>
                <FilterMain label="Весь Казахстан" type dispatch={() => {}} />
                <FilterMain label="Цена" type dispatch={() => {}} />
            </div>
        </div>
    ) : null
}
