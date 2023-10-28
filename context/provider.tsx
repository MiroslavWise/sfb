"use client"

import { Suspense, useEffect } from "react"
import { ToastContainer } from "react-toastify"

import type { TChildrenProps } from "@/types/types"

import {
    ModalLogin,
    VisiblePreviewPhotos,
    AnimatedLoadPage,
} from "@/components/templates"
import { Toast } from "@/components/layout/toast"
import { ApolloProviderContext } from "./ApolloProvider"
import { WebSocketContext } from "./WebSocketContext"

import { useAuth } from "@/store/state/useAuth"

import "./i18n"
import "./DayJSDefault"
import "react-toastify/dist/ReactToastify.css"

const Provider: TChildrenProps = ({ children }) => {
    const { refresh } = useAuth()

    useEffect(() => {
        refresh()
    }, [])

    return (
        <ApolloProviderContext>
            <WebSocketContext>
                <AnimatedLoadPage />
                <ModalLogin />
                <Suspense fallback={false}>{children}</Suspense>
                <Toast />
                <ToastContainer />
                <VisiblePreviewPhotos />
            </WebSocketContext>
        </ApolloProviderContext>
    )
}

export default Provider
