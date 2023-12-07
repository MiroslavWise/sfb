import { SearchBar, CatalogMain } from "@/components/pages/market"

import styles from "./page.module.scss"

export default function Market({ params, query }: any) {
    return (
        <div className={styles.wrapper}>
            <section>
                <SearchBar />
                <CatalogMain />
            </section>
        </div>
    )
}
