import { gql } from "@apollo/client"
import { AUTHOR, CHAT } from "./fragment"

export const queryChatList = gql`
    ${CHAT}
    query {
        chatList {
            totalCount
            results {
                ...chat
            }
        }
    }
`
export const queryChatListSellerId = gql`
    ${CHAT}
    query ($seller_Id: UUID) {
        chatList(seller_Id: $seller_Id) {
            totalCount
            results {
                ...chat
            }
        }
    }
`
export const queryChatListBuyerId = gql`
    ${CHAT}
    query ($buyer_Id: UUID) {
        chatList(buyer_Id: $buyer_Id) {
            totalCount
            results {
                ...chat
            }
        }
    }
`

export const queryChatMessageByChatId = gql`
    ${AUTHOR}
    query ($chatId: UUID!) {
        chatMessageByChatId(chatId: $chatId) {
            totalCount
            results {
                createdAt
                updatedAt
                id
                text
                isRead
                author {
                    ...author
                }
                messageType
                photoUrl
                photo
            }
        }
    }
`

export const queryChatById = gql`
    ${CHAT}
    query ($chatId: UUID!) {
        chatById(chatId: $chatId) {
            ...chat
        }
    }
`

export const queryChatTotalCount = gql`
    query {
        chatList {
            totalCount
        }
    }
`

export const mutationChatMessageReadAll = gql`
    mutation ($chatId: UUID!) {
        chatMessageReadAll(chatId: $chatId) {
            ok
            errors {
                messages
            }
        }
    }
`
