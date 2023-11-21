"use client"

import type { IChildrenProps } from "@/types/types"

import { useTitle } from "@/helpers/hooks/useTitle"

import styles from "./layout.module.scss"

export default function LayoutFavorites({ children }: IChildrenProps) {
    useTitle("Избранное")

    return (
        <div className={styles.wrapper}>
            <header>
                <h3>Избранное</h3>
            </header>
            {children}
        </div>
    )
}
