import { IAuthor } from "./types"

export interface IChatItemList {
    createdAt: Date
    updatedAt: Date
    id: string
    product: {
        id: string
        name: string
    }
    productRequest: {
        id: string
        name: string
    }
    seller: {
        id: string
        fullName: string
        photo: string
    }
    buyer: {
        id: string
        fullName: string
        photo: string
    }
}

export interface IQueryChatList {
    chatList: {
        totalCount: number
        results: IChatItemList[]
    }
}

export interface IItemChatMessageByChatId {
    createdAt: Date
    updatedAt: Date
    id: string
    text: string
    isRead: boolean
    author: IAuthor
}

export interface IQueryChatMessageByChatId {
    chatMessageByChatId: {
        totalCount: number
        results: IItemChatMessageByChatId[]
    }
}
