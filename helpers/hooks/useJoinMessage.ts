import dayjs from "dayjs"

import { IItemChatMessageByChatId, TTypeMessage } from "@/types/chat"

function useJoinMessage() {
    function join(item_messages: IItemChatMessageByChatId[]): IReturnMessages[] {
        const items: IReturnMessages[] = []

        if (item_messages) {
            item_messages.forEach((message, index) => {
                if (index === 0) {
                    items.push({
                        type: "time",
                        time: dayjs(message.createdAt).format("DD.MM.YYYY"),
                    })
                }
                if (
                    index !== 0 &&
                    dayjs(message.createdAt).format("DD.MM.YYYY") !== dayjs(items.at(-1)?.messages?.at(-1)?.time).format("DD.MM.YYYY")
                ) {
                    items.push({
                        type: "time",
                        time: dayjs(message.createdAt).format("DD.MM.YYYY"),
                    })
                }
                if (items.at(-1)?.emitterId === message?.author?.id) {
                    items.at(-1)?.messages?.push({
                        message: message?.text || "",
                        id: message?.id,
                        time: message?.createdAt,
                        type: message?.messageType || "TEXT",
                        photoUrl: message?.photoUrl,
                        isRead: message?.isRead,
                    })
                } else {
                    items.push({
                        emitterId: message?.author?.id!,
                        id: message.id,
                        type: "messages",
                        messages: [
                            {
                                message: message?.text,
                                id: message.id,
                                time: message?.createdAt,
                                type: message?.messageType || "TEXT",
                                photoUrl: message?.photoUrl,
                                isRead: message?.isRead,
                            },
                        ],
                    })
                }
            })
        }
        return items
    }

    return { join }
}

interface IReturnMessages {
    messages?: INewMessage[]
    type: "messages" | "time"
    time?: string
    emitterId?: string
    id?: string
}

export interface INewMessage {
    message: string
    id: string
    time: string | Date
    type: TTypeMessage
    photoUrl?: string
    isRead: boolean
}

export { useJoinMessage, type IReturnMessages }
