"use client"

import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { configure } from "@gravity-ui/uikit"
import { PageLayout, PageLayoutAside } from "@gravity-ui/navigation"

import type { TChildrenProps } from "@/types/types"

import {
    ModalLogin,
    VisiblePreviewPhotos,
    AnimatedLoadPage,
} from "@/components/templates"
import { ApolloProviderContext } from "./ApolloProvider"
import { WebSocketContext } from "./WebSocketContext"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import "./i18n"
import "./DayJSDefault"
import "react-toastify/dist/ReactToastify.css"
import { AsideFooter } from "@/components/layout/aside-footer"
import { MENU_ITEMS } from "@/components/layout/aside-content/menu-item"

configure({
    lang: "ru",
})

const Provider: TChildrenProps = ({ children }) => {
    const { refresh } = useAuth()
    const [compact, setCompact] = useState(false)
    const { handlePush } = usePush()

    useEffect(() => {
        refresh()
    }, [])

    return (
        <ApolloProviderContext>
            <WebSocketContext>
                <PageLayout compact={compact}>
                    <PageLayoutAside
                        headerDecoration
                        className="g-aside-gradient"
                        logo={{
                            text: "SearchFindBuy",
                            iconSrc: "/svg/logo.svg",
                            onClick(event) {
                                event.preventDefault()
                                event.stopPropagation()
                                handlePush(`/`)
                            },
                        }}
                        onChangeCompact={(value) => {
                            console.log("value: ", value)
                            setCompact(value)
                        }}
                        renderFooter={({ compact }) => (
                            <AsideFooter compact={compact} />
                        )}
                        menuItems={MENU_ITEMS({})}
                    />
                    <PageLayout.Content>{children}</PageLayout.Content>
                </PageLayout>
                <AnimatedLoadPage />
                <ModalLogin />
                <ToastContainer />
                <VisiblePreviewPhotos />
            </WebSocketContext>
        </ApolloProviderContext>
    )
}

export default Provider
