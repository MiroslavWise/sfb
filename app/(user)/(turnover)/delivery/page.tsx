import { DeliveryPage } from "@/components/pages/delivery"

import styles from "./page.module.scss"

export default function Delivery() {
    return (
        <div className={styles.wrapper}>
            <h4>Мои доставки</h4>
            <DeliveryPage />
        </div>
    )
}
