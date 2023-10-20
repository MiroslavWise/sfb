"use client"

import { useEffect } from "react"

import type { TChildrenProps } from "@/types/types"

import { Toast } from "@/components/layout/toast"
import { ModalLogin } from "@/components/templates"
import { ApolloProviderContext } from "./ApolloProvider"
import { WebSocketContext } from "./WebSocketContext"

import { useAuth } from "@/store/state/useAuth"

import "./i18n"
import "./DayJSDefault"

const Provider: TChildrenProps = ({ children }) => {
    const { refresh } = useAuth()

    useEffect(() => {
        refresh()
    }, [])

    return (
        <ApolloProviderContext>
            <WebSocketContext>
                <ModalLogin />
                {children}
                <Toast />
            </WebSocketContext>
        </ApolloProviderContext>
    )
}

export default Provider
