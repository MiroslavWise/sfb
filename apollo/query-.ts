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
            }
        }
    }
`
