"use client"

import { LargePhoto } from "./components/LargePhoto"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

import styles from "./styles/style.module.scss"
import { FooterPhotos } from "./components/FooterPhotos"
import { ButtonClose } from "./components/ButtonClose"

export const VisiblePreviewPhotos = () => {
    const { visible } = useVisiblePhotos()

    return visible ? (
        <div className={styles.wrapper} data-visible={visible}>
            {visible && <ButtonClose />}
            {visible && <LargePhoto />}
            {visible && <FooterPhotos />}
        </div>
    ) : null
}
