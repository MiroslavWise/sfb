import { TNameRegion } from "./types/types"

import styles from "./styles/style.module.scss"

export const ComponentCity: TNameRegion = ({ name }) => {
    return (
        <div className={styles.container}>
            <img
                src="/svg/building-07.svg"
                alt="building"
                width={16}
                height={16}
            />
            <span>{name}</span>
        </div>
    )
}
