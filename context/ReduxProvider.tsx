"use client"

import { Provider } from "react-redux"
import { type ReactNode } from "react"

import { store } from "@/redux/state/store"

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
}
