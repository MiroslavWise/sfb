"use client"

import { Suspense, useEffect } from "react"
import { ToastContainer } from "react-toastify"

import type { TChildrenProps } from "@/types/types"

import {
    ModalLogin,
    VisiblePreviewPhotos,
    AnimatedLoadPage,
} from "@/components/templates"
import { ApolloData } from "./ApolloData"
import { Toast } from "@/components/layout/toast"
import { ApolloProviderContext } from "./ApolloProvider"
import { WebSocketContext } from "./WebSocketContext"

import { useAuth } from "@/store/state/useAuth"

import "./i18n"
import "./DayJSDefault"
import "react-toastify/dist/ReactToastify.css"

const Provider: TChildrenProps = ({ children }) => {
    const refresh = useAuth(({ refresh }) => refresh)

    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        window.addEventListener("load", () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("/service-worker.js")
                    .then((response) => {
                        console.log("serviceWorker: ", response.scope)
                    })
            }
        })
    }, [])

    return (
        <ApolloProviderContext>
            <WebSocketContext>
                <ApolloData>
                    <AnimatedLoadPage />
                    <ModalLogin />
                    <Suspense fallback={false}>{children}</Suspense>
                    <Toast />
                    <ToastContainer />
                    <VisiblePreviewPhotos />
                </ApolloData>
            </WebSocketContext>
        </ApolloProviderContext>
    )
}

export default Provider
