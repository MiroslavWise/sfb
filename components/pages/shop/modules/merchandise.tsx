import styles from "../styles/modules.module.scss"

export const Merchandise = () => {
    return (
        <div className={styles.container}>
            <h3>Список товаров</h3>
            <h4>
                Список товаров, относящийся к данному магазину. Вы можете
                зарегестрировать товар, и указывать его актуальность{" "}
                <span>(в будущем данная функция будет автоматизирована)</span>
            </h4>
            <footer>
                <button>
                    <span>Добавить новый товар</span>
                </button>
            </footer>
        </div>
    )
}
