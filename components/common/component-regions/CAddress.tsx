"use client"

import Image from "next/image"

import { TNameRegion } from "./types/types"

import styles from "./styles/style.module.scss"

export const ComponentAddress: TNameRegion = ({ name }) => {
    return (
        <div className={styles.container}>
            <Image
                src="/svg/map-02.svg"
                alt="map"
                width={16}
                height={16}
            />
            <span>{name}</span>
        </div>
    )
}
