import { SearchBar, CatalogMain } from "@/components/pages/market"

import styles from "./page.module.scss"

export default function Market() {
    return (
        <div className={styles.wrapper}>
            <section>
                <SearchBar />
                <CatalogMain />
            </section>
        </div>
    )
}
