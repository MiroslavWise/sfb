import { gql } from "@apollo/client"

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
