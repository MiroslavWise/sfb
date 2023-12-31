import { TNameRegion } from "./types/types"

import styles from "./styles/style.module.scss"

export const ComponentAddress: TNameRegion = ({ name }) => {
    return (
        <div className={styles.container}>
            <img src="/svg/map-02.svg" alt="map" width={16} height={16} />
            <span>{name}</span>
        </div>
    )
}
