"use client"

import styles from "../styles/search-bar.module.scss"

import { FilterMain } from "./FilterMain"

export const SearchBar = () => {
    return (
        <div className={styles.wrapper}>
            <div data-container>
                <input placeholder="Искать на бирже" />
                <button data-button-search>
                    <span>Поиск</span>
                </button>
            </div>
            <div data-main-filter>
                <FilterMain label="Весь Казахстан" />
                <FilterMain label="Цена" />
            </div>
        </div>
    )
}
