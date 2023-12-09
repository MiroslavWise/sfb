import Link from "next/link"

import styles from "../styles/buttons.module.scss"

export const ButtonCreate = () => (
    <Link className={styles.buttonCreate} data-create href={{ pathname: `/my-shop/add` }}>
        <span>Создать</span>
        <img src={`/svg/plus-circle.svg`} alt="plus" width={22} height={22} />
    </Link>
)
