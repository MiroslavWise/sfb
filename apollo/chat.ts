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
