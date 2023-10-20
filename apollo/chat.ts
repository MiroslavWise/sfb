import { gql } from "@apollo/client"

export const queryChatList = gql`
    query {
        chatList {
            totalCount
            results {
                createdAt
                updatedAt
                id
                product {
                    id
                    name
                }
                productRequest {
                    id
                    name
                }
                seller {
                    id
                    fullName
                    photo
                }
                buyer {
                    id
                    fullName
                    photo
                }
            }
        }
    }
`

export const queryChatMessageByChatId = gql`
    query ($chatId: UUID!) {
        chatMessageByChatId(chatId: $chatId) {
            totalCount
            results {
                createdAt
                updatedAt
                id
                text
                isRead
            }
        }
    }
`
