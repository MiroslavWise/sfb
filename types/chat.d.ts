import { IAuthor, IPhoto } from "./types"

export interface IChatProduct {
    id: string
    name: string
    price: number
    photoListUrl: IPhoto[]
}

export interface IChatItem {
    createdAt: Date
    updatedAt: Date
    id: string
    product: IChatProduct
    productRequest: IChatProduct
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
        results: IChatItem[]
    }
}

export interface IQueryCatId {
    chatById: IChatItem
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

export interface IItemNotification {
    createdAt: Date
    updatedAt: Date
    id: string
    target: {
        id: string
    } | null
    fromUser: {
        id: string
    } | null
    redirectUrl: string
    redirectShortUrl: string
    verb: string
    isRead: boolean
}

export interface IQueryNotifications {
    notificationList: {
        totalCount: number
        results: IItemNotification[]
    }
}
