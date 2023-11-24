import styles from "../styles/modules.module.scss"

export const DeliveryOfGoods = () => {
    return (
        <div className={styles.container}>
            <h3>Список доставок к покупателю</h3>
            <h4>
                Что-бы узнать более подробную информацию о конкретной доставке,
                перейдите на страницу этой доставки, нажав на карточку доставки
            </h4>
        </div>
    )
}
