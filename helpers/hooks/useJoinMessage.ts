import dayjs from "dayjs"

import { IItemChatMessageByChatId } from "@/types/chat"

function useJoinMessage() {
    function join(
        item_messages: IItemChatMessageByChatId[],
    ): IReturnMessages[] {
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
                    dayjs(message.createdAt).format("DD.MM.YYYY") !==
                        dayjs(items.at(-1)?.messages?.at(-1)?.time).format(
                            "DD.MM.YYYY",
                        )
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
    messages?: {
        message: string
        id: string | number
        time: string | Date
    }[]
    type: "messages" | "time"
    time?: string
    emitterId?: string
    id?: string | number
}

export { useJoinMessage, type IReturnMessages }
