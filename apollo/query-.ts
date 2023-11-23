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
