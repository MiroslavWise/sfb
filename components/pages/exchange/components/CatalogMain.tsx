import { ITEMS_MAIN_CATALOG } from "../constants/items-main-catalog"
import styles from "../styles/catalog-main.module.scss"
import { CardCatalog } from "./CardCatalog"

export const CatalogMain = () => {
    return (
        <div className={styles.wrapper}>
            {ITEMS_MAIN_CATALOG.map((item) => (
                <CardCatalog key={`${item.value}-card-catalog`} {...item} />
            ))}
        </div>
    )
}
