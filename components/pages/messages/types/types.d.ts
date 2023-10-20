import { IItemChatMessageByChatId } from "@/types/chat"
import type { FC } from "react"

interface IItemMessage {
    photo: string | null
    messages: {
        id: number | string
        message: string
        time: Date | string
    }[]
}
interface IItemTime {
    time: string
}

export interface IDataUser {
    id: string | null
    photo: string | null
    fullName: string | null
}

interface IListMessages {
    messages: IItemChatMessageByChatId[]
    dataUser: IDataUser
}

export type TItemTime = FC<IItemTime>
export type TItemMessage = FC<IItemMessage>
export type TListMessages = FC<IListMessages>
