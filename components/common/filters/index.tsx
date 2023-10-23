import { FilterMain } from "@/components/pages/market/components/FilterMain"
import styles from "./style.module.scss"

export const Filter = ({}) => {
    return (
        <div className={styles.container}>
            <FilterMain label="Цена" />
            <FilterMain label="Весь казахстан" />
            <FilterMain label="Категория" />
        </div>
    )
}
