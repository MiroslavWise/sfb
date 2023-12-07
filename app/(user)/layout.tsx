"use client"

import { useEffect } from "react"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import "./layout.scss"

export default function LayoutUser({ children }: IChildrenProps) {
    const state = useAuth(({ state }) => state)
    const token = useAuth(({ token }) => token)
    const { handlePush } = usePush()

    useEffect(() => {
        if (state === "SignIn") {
            handlePush("/")
        }
    }, [token, state])

    return token ? (
        <div className="__user-wrapper__">
            <section>{children}</section>
        </div>
    ) : null
}
