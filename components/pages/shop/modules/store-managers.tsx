import styles from "../styles/modules.module.scss"

export const StoreManagers = () => {
    return (
        <div className={styles.container}>
            <h3>Список менеджеров мазина</h3>
            <h4>
                Здесь находится список менеджеров, которым разрешён доступ к
                управлению магазином
            </h4>
            <footer>
                <button>
                    <span>Добавить менеджера</span>
                </button>
            </footer>
        </div>
    )
}
