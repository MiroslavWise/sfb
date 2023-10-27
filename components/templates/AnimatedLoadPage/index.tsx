"use client"

import { memo, useEffect } from "react"
import { usePathname } from "next/navigation"

import { cx } from "@/helpers/lib/cx"
import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

import styles from "./style.module.scss"

export const AnimatedLoadPage = memo(function AnimatedLoadPage() {
    const pathname = usePathname()
    const { isAnimated, setIsAnimated } = useAnimateLoadPage()

    console.log(`%c pathname: ${pathname}`, "color: #0f0")
    useEffect(() => {
        if (pathname) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    setIsAnimated(false)
                })
            }, 150)
        }
    }, [pathname])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
})
