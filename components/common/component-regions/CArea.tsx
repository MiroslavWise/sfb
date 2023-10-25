"use client"

import Image from "next/image"

import { TNameRegion } from "./types/types"

import styles from "./styles/style.module.scss"

export const ComponentArea: TNameRegion = ({ name }) => {
    return (
        <div className={styles.container}>
            <Image src="/svg/globe-05.svg" alt="globe" width={16} height={16} />
            <span>{name}</span>
        </div>
    )
}
