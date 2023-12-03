import { ButtonCreate, ShopMainPage } from "@/components/pages/shop"

import styles from "./page.module.scss"

export default function MyShop({}) {
    return (
        <section className={styles.wrapper}>
            <header>
                <ButtonCreate />
            </header>
            <ShopMainPage />
        </section>
    )
}
