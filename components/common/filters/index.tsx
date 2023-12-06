import { TFilter } from "./types"

import { FilterMain } from "@/components/pages/market/components/FilterMain"

import styles from "./style.module.scss"

export const Filter: TFilter = ({ typePrice, dispatchPrice }) => {
    function handleDispatchPrice() {
        if (dispatchPrice) dispatchPrice()
    }

    return (
        <div className={styles.container}>
            <FilterMain typeFilter="price" label="Цена" type={!!typePrice} dispatch={handleDispatchPrice} />
            <FilterMain label="Весь казахстан" type dispatch={() => {}} />
            <FilterMain label="Категория" type dispatch={() => {}} />
        </div>
    )
}
