"use client"

import { memo, useEffect } from "react"
import { usePathname } from "next/navigation"

import { cx } from "@/helpers/lib/cx"
import { useAnimateLoadPage, animatedLoadPage } from "@/store/state/useAnimateLoadPage"

import styles from "./style.module.scss"

export const AnimatedLoadPage = memo(function AnimatedLoadPage() {
    const pathname = usePathname()
    const isAnimated = useAnimateLoadPage(({ isAnimated }) => isAnimated)

    useEffect(() => {
        if (pathname) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    animatedLoadPage(false)
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
