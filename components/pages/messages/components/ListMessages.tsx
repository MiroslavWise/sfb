"use client"

import { ReactNode, memo, useEffect, useMemo, useRef } from "react"

import { TListMessages } from "../types/types"
import { useJoinMessage } from "@/helpers/hooks/useJoinMessage"
import { useAuth } from "@/store/state/useAuth"
import { ItemMyMessage } from "./ItemMyMessage"
import { ItemUserMessage } from "./ItemUserMessage"
import { ItemTime } from "./ItemTime"

const $ListMessages: TListMessages = ({ messages, dataUser }) => {
    const user = useAuth(({ user }) => user)
    const { join } = useJoinMessage()
    const { id: userId } = user ?? {}
    const ulChat = useRef<HTMLUListElement>(null)
    const numberIdMessage = useRef<string | null>(null)

    const messagesJoin: ReactNode = useMemo(() => {
        console.log("%c messages:", "color: #0ff", messages)
        if (Array.isArray(messages)) {
            return join(messages).map((item, index) => {
                if (item.emitterId === userId && item.type === "messages") {
                    return (
                        <ItemMyMessage
                            key={`${item.id}_message_${item.id}`}
                            photo={user?.photo!}
                            messages={item.messages!}
                        />
                    )
                }
                if (
                    item.emitterId === dataUser?.id &&
                    item.type === "messages"
                ) {
                    return (
                        <ItemUserMessage
                            key={`${item?.id}_message_${item.id}`}
                            photo={dataUser?.photo}
                            messages={item.messages!}
                        />
                    )
                }
                if (item.type === "time") {
                    return (
                        <ItemTime
                            time={item.time!}
                            key={`${item.time}_time_block`}
                        />
                    )
                }
                return null
            })
        }
        return null
    }, [dataUser, messages, join, userId])

    useEffect(() => {
        requestAnimationFrame(() => {
            if (messages?.length > 0) {
                if (ulChat.current) {
                    if (numberIdMessage.current !== messages?.at(-1)?.id) {
                        const top = ulChat.current.scrollHeight
                        ulChat.current.scroll({
                            top: top + 150,
                            behavior: "smooth",
                        })
                        numberIdMessage.current = messages?.at(-1)?.id!
                    }
                }
            }
        })
    }, [messages, numberIdMessage])

    return <ul ref={ulChat}>{messagesJoin}</ul>
}

export const ListMessages = memo($ListMessages)
