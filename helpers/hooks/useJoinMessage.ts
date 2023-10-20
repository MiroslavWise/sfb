import dayjs from "dayjs"
import { useId } from "react"

import { IItemChatMessageByChatId } from "@/types/chat"

function useJoinMessage() {
    const idMessage = useId()

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
                // if (items.at(-1)?.emitterId === message?.emitterId) {
                if (items.at(-1)?.emitterId === "qwerqqwer") {
                    items.at(-1)?.messages?.push({
                        message: message?.text || "",
                        id: `${message?.id}-${idMessage}`,
                        time: message?.createdAt,
                    })
                } else {
                    items.push({
                        emitterId: message?.createdAt.toString()!,
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
