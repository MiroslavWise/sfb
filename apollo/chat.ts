import { gql } from "@apollo/client"
import { AUTHOR } from "./fragment"

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
