"use client"

import { toast } from "react-toastify"
import { IChildrenProps } from "@/types/types"
import { useAuth } from "@/store/state/useAuth"
import { createContext, memo, useContext, useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"
import { CONFIG_ENV } from "@/helpers/config/ENV"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { WebSocketLike } from "react-use-websocket/dist/lib/types"
import { usePush } from "@/helpers/hooks/usePush"
import { useLazyQuery } from "@apollo/client"
import { queryChatUnreadCount } from "@/apollo/query-"

const CreateContext = createContext<ISocket>({
    readyState: null,
    getWebSocket: () => null,
})

interface ISocket {
    readyState: ReadyState | null
    getWebSocket: () => WebSocketLike | null
}

export const WebSocketContext = memo(({ children }: IChildrenProps) => {
    const { token, user } = useAuth((_) => ({
        token: _.token,
        user: _.user,
    }))
    const { handlePush } = usePush()
    const chatId = useSearchParams().get("chat-id")
    const [chanel, setChanel] = useState<WebSocket | null | any>(null)
    const [reloadMessages] = useLazyQuery(queryChatUnreadCount)

    const { readyState, getWebSocket } = useWebSocket(chanel)

    useEffect(() => {
        if (user?.id && readyState === 1) {
            const events = (event: any) => {
                const data = JSON.parse(event?.data)?.data

                if (
                    data?.type === "new_message" &&
                    data?.sender?.id !== user?.id &&
                    chatId !== data?.chat_id
                ) {
                    const qwer = () =>
                        toast(
                            `Тебе новое сообщение от ${data?.sender?.full_name}`,
                            {
                                position: "top-center",
                                autoClose: 7000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                onClick() {
                                    handlePush(
                                        `/messages?chat-id=${data?.chat_id}`,
                                    )
                                },
                            },
                        )
                    qwer()
                    reloadMessages()
                }
            }
            getWebSocket()?.addEventListener("message", events)

            return () => {
                getWebSocket()?.removeEventListener("message", events)
            }
        }
    }, [readyState, user, chatId])

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
})

export const useSocket = () => {
    const context = useContext(CreateContext)

    if (context === undefined) {
        throw new Error("useAntdLang must be used within a WebSocProvider")
    }

    return context
}
