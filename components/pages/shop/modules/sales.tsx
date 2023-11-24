import { type Dispatch } from "react"

import { type TTypeValue } from "../constants/tabs"

import styles from "../styles/modules.module.scss"

export const Sales = ({ set }: { set: Dispatch<TTypeValue> }) => {
    return (
        <div className={styles.container}>
            <h3>Список проданных товаров магазином</h3>
            <h4>
                Здесь отобрается полный список, и количество проданных едниц
                товара, а если вам нужно отследить доставку по конкретному
                товару, вы можете перейти в разрел{" "}
                <span
                    className="c-p"
                    onClick={() => {
                        set("delivery-of-goods")
                    }}
                >
                    "Доставка товара"
                </span>
            </h4>
        </div>
    )
}
