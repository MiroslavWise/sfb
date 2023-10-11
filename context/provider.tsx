"use client"

import type { TChildrenProps } from "@/types/types"

import "./DayJSDefault"
import "./i18n"
import { ModalLogin } from "@/components/templates"

const Provider: TChildrenProps = ({ children }) => {
    return (
        <>
            <ModalLogin />
            {children}
        </>
    )
}

export default Provider
