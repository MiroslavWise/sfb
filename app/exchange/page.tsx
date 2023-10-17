import { SearchBar, CatalogMain } from "@/components/pages/exchange"

import styles from "./page.module.scss"

export default function Exchange() {
    return (
        <div className={styles.wrapper}>
            <section>
                <SearchBar />
                <CatalogMain />
            </section>
        </div>
    )
}
