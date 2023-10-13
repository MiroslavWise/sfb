"use client"

import type { ThemeConfig } from "antd"
import { ToastContainer } from "react-toastify"

import type { TChildrenProps } from "@/types/types"

import { ModalLogin } from "@/components/templates"

import "./i18n"
import "./DayJSDefault"
import "antd/dist/reset.css"
import "react-toastify/dist/ReactToastify.css"

const Provider: TChildrenProps = ({ children }) => {
    return (
        <>
            <ModalLogin />
            {children}
            <ToastContainer />
        </>
    )
}

export default Provider
