import { gql } from "@apollo/client"
import { PRODUCT } from "./fragment"

export const queryShopList = gql`
    {
        shopList {
            totalCount
            results {
                id
                name
                description
                shopPhoto
                confirmation
                address
                phone
                photoUrl
            }
        }
    }
`

export const queryShopById = gql`
    query ($shopId: UUID!) {
        shopById(shopId: $shopId) {
            id
            name
            description
            shopPhoto
            confirmation
            address
            phone
            photoUrl
        }
    }
`

export const queryCart = gql`
    ${PRODUCT}
    query {
        cart {
            id
            cartItemList {
                id
                quantity
                product {
                    ...product
                    photoListUrl {
                        id
                        photoUrl
                    }
                }
            }
            cartTotalSum
        }
    }
`

export const queryDeliveryMethodList = gql`
    query {
        deliveryMethodList {
            name
            id
            price
        }
    }
`

export const queryOrderList = gql`
    ${PRODUCT}
    query {
        orderList {
            totalCount
            results {
                id
                orderNumber
                createdAt
                status
                totalPrice
                deliveryMethod {
                    name
                    id
                }
                cart {
                    id
                    cartItemList {
                        id
                        createdAt
                        product {
                            ...product
                            photoListUrl {
                                id
                                photoUrl
                            }
                        }
                    }
                }
            }
        }
    }
`

export const queryChatUnreadCount = gql`
    query {
        chatUnreadCount {
            totalCount
        }
    }
`

export const mutationProductCreate = gql`
    mutation ($shopId: UUID) {
        productCreate(input: { shopId: $shopId }) {
            ok
            product {
                id
            }
            errors {
                messages
            }
        }
    }
`
