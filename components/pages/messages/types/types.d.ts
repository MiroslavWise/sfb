import { IItemChatMessageByChatId } from "@/types/chat"
import type { FC } from "react"

interface IItemMessage {
    photo: string
    messages: {
        id: number | string
        message: string
        time: Date | string
    }[]
}
interface IItemTime {
    time: string
}

interface IListMessages {
    messages: IItemChatMessageByChatId[]
    dataUser: {
        id: string
        photo: string
        fullName: string
    }
}

export type TItemTime = FC<IItemTime>
export type TItemMessage = FC<IItemMessage>
export type TListMessages = FC<IListMessages>
