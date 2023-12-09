"use client"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item-link-profile.module.scss"

export const ItemLinkProfile = ({ icon, label, value }: any) => {
    const { handlePush } = usePush()
    return (
        <li
            className={styles.container}
            onClick={() => {
                handlePush(`/profile${value}`)
            }}
        >
            <section>
                <img src={icon} alt={icon} width={30} height={30} />
                <p>{label}</p>
            </section>
            <img src="/svg/arrow-cirlce-to-right.svg" alt="arrow-cirlce-to-right" width={25} height={25} />
        </li>
    )
}
