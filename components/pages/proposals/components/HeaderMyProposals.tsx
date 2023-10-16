import { ItemHeaderCurrentMyProposals } from "./ItemHeaderCurrentMyProposals"

import styles from "../styles/header-my-proposals.module.scss"

export const HeaderMyProposals = () => {
    return (
        <ul className={styles.header}>
            <ItemHeaderCurrentMyProposals
                value={"qwerqwer"}
                label="Гипсокартон (Стена/Потолок)"
            />
            <ItemHeaderCurrentMyProposals
                value={"фыва"}
                label="Смартфон Apple iPhone 14"
            />
            <ItemHeaderCurrentMyProposals
                value={"dfgsdfhdfh"}
                label="185/60R14 82Q Tunga Nord"
            />
            <ItemHeaderCurrentMyProposals
                value={"qwet ert egsdgf"}
                label="Бампер Toyota Land Cruiser Prado"
            />
            <ItemHeaderCurrentMyProposals
                value={"wer ert egsdgf"}
                label="Renault megane3"
            />
            <ItemHeaderCurrentMyProposals
                value={"qwet edfasrt egsdgf"}
                label="Противотуманные фары"
            />
        </ul>
    )
}
