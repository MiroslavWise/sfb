"use client"

import { toast } from "react-toastify"
import { useQuery } from "@apollo/client"
import { IChildrenProps } from "@/types/types"
import { useAuth } from "@/store/state/useAuth"
import { useSearchParams } from "next/navigation"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { WebSocketLike } from "react-use-websocket/dist/lib/types"
import { createContext, memo, useContext, useEffect, useState } from "react"

import { usePush } from "@/helpers/hooks/usePush"
import { CONFIG_ENV } from "@/helpers/config/ENV"
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
    const chatId = useSearchParams().get("chat-id")
    const token = useAuth(({ token }) => token)
    const user = useAuth(({ user }) => user)
    const { handlePush } = usePush()
    const [chanel, setChanel] = useState<WebSocket | null | any>(null)
    const { refetch: reloadMessages } = useQuery(queryChatUnreadCount)

    const { readyState, getWebSocket } = useWebSocket(chanel)

    useEffect(() => {
        if (user?.id && readyState === 1) {
            const events = (event: any) => {
                const data = JSON.parse(event?.data)?.data

                if (data?.type === "new_message" && data?.sender?.id !== user?.id && chatId !== data?.chat_id) {
                    const message = () =>
                        toast(
                            <p className="__toast_p__">
                                {data?.sender?.full_name}: <span>{data?.message_text || "__"}</span>
                            </p>,
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
                                    handlePush(`/messages?chat-id=${data?.chat_id}`)
                                },
                            },
                        )
                    message()
                    const time = setTimeout(reloadMessages, 150)

                    return () => clearTimeout(time)
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

    return <CreateContext.Provider value={{ readyState, getWebSocket }}>{children}</CreateContext.Provider>
})

export const useSocket = () => {
    const context = useContext(CreateContext)

    if (context === undefined) {
        throw new Error("useAntdLang must be used within a WebSocProvider")
    }

    return context
}
