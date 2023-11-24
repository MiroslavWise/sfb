"use client"

import { Suspense, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { PrimeReactProvider } from "primereact/api"

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
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

const Provider: TChildrenProps = ({ children }) => {
    const { refresh } = useAuth((_) => ({ refresh: _.refresh }))

    useEffect(() => {
        refresh()
    }, [])

    return (
        <PrimeReactProvider>
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
        </PrimeReactProvider>
    )
}

export default Provider
