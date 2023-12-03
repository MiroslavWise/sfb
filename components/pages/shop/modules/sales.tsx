import Link from "next/link"

import styles from "../styles/modules.module.scss"

export const Sales = ({ id }: { id: string }) => {
    return (
        <div className={styles.container}>
            <h3>Список проданных товаров магазином</h3>
            <h4>
                Здесь отобрается полный список, и количество проданных едниц товара, а если вам нужно отследить доставку по конкретному
                товару, вы можете перейти в разрел{" "}
                <Link href={`/my-shop/${id}/delivery-of-goods`} className="c-p">
                    "Доставка товара"
                </Link>
            </h4>
        </div>
    )
}
