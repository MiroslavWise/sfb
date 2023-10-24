"use client"

import { Suspense, useEffect } from "react"

import type { IChildrenProps } from "@/types/types"

import { LeftAsideUser } from "@/components/layout/user/components/LeftAsideUser"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./layout.module.scss"

export default function LayoutUser({ children }: IChildrenProps) {
    const { token, state } = useAuth()
    const { handlePush } = usePush()

    useEffect(() => {
        if (state === "SignIn") {
            handlePush("/")
        }
    }, [token, state])

    return token ? (
        <section className={styles.wrapper}>
            <Suspense fallback={false}>
                <LeftAsideUser />
            </Suspense>
            <Suspense fallback={false}>{children}</Suspense>
        </section>
    ) : null
}
