"use client"

import { useMemo } from "react"
import { ConfigProvider } from "antd"
import type { ThemeConfig } from "antd"
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs"
import type Entity from "@ant-design/cssinjs/es/Cache"
import { useServerInsertedHTML } from "next/navigation"

import type { TChildrenProps } from "@/types/types"

import { ModalLogin } from "@/components/templates"

import "./i18n"
import "./DayJSDefault"

const theme: ThemeConfig = { token: {} }
const Provider: TChildrenProps = ({ children }) => {
    const cache = useMemo<Entity>(() => createCache(), [])
    useServerInsertedHTML(() => (
        <style
            id="antd"
            dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
        />
    ))
    return (
        <StyleProvider cache={cache}>
            <ConfigProvider theme={theme}>
                <ModalLogin />
                {children}
            </ConfigProvider>
        </StyleProvider>
    )
}

export default Provider
