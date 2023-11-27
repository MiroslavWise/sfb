"use client"

import { memo, useEffect } from "react"
import { usePathname } from "next/navigation"

import { cx } from "@/helpers/lib/cx"
import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

import styles from "./style.module.scss"

export const AnimatedLoadPage = memo(function AnimatedLoadPage() {
    const pathname = usePathname()
    const isAnimated = useAnimateLoadPage(({ isAnimated }) => isAnimated)
    const setIsAnimated = useAnimateLoadPage(
        ({ setIsAnimated }) => setIsAnimated,
    )

    useEffect(() => {
        if (pathname) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    setIsAnimated(false)
                })
            }, 1)
        }
    }, [pathname])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
})
