"use client"

import { useAuth } from "@/store/state/useAuth"
import { IChildrenProps } from "@/types/types"
import { createContext, useContext, useEffect, useState } from "react"

import { CONFIG_ENV } from "@/helpers/config/ENV"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { WebSocketLike } from "react-use-websocket/dist/lib/types"

const CreateContext = createContext<ISocket>({
    readyState: null,
    getWebSocket: () => null,
})

interface ISocket {
    readyState: ReadyState | null
    getWebSocket: () => WebSocketLike | null
}

export const WebSocketContext = ({ children }: IChildrenProps) => {
    const { token } = useAuth()
    const [chanel, setChanel] = useState<WebSocket | null | any>(null)

    const { readyState, getWebSocket } = useWebSocket(chanel)

    useEffect(() => {
        if (token) {
            if (!chanel) {
                setChanel(`${CONFIG_ENV.ws}${token}`)
            }
        } else {
            if (chanel) {
                setChanel(null)
            }
        }
    }, [token, chanel])

    return (
        <CreateContext.Provider value={{ readyState, getWebSocket }}>
            {children}
        </CreateContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(CreateContext)

    if (context === undefined) {
        throw new Error("useAntdLang must be used within a WebSocProvider")
    }

    return context
}
