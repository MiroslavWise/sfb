"use client"

import { useInsertionEffect, useState, memo } from "react"
import { usePathname } from "next/navigation"

import { cx } from "@/helpers/lib/cx"
import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

import styles from "./style.module.scss"

export const AnimatedLoadPage = memo(function AnimatedLoadPage() {
    const pathname = usePathname()
    const [state, setState] = useState(pathname)
    const { isAnimated, setIsAnimated } = useAnimateLoadPage()

    useInsertionEffect(() => {
        if (pathname !== state) {
            setIsAnimated(false)
            setState(pathname)
        }
    }, [pathname, state])

    return (
        <div className={cx(styles.wrapper, isAnimated && styles.active)}>
            <div className={styles.container} />
        </div>
    )
})
