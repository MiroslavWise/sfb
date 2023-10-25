import { gql } from "@apollo/client"

import { AUTHOR, PRODUCT, PRODUCT_REQUEST } from "./fragment"

export const queryProductOfferList = gql`
    ${AUTHOR}
    ${PRODUCT}
    ${PRODUCT_REQUEST}
    query ($product_Id: UUID) {
        productOfferList(product_Id: $product_Id) {
            totalCount
            results {
                id
                createdAt
                product {
                    ...product
                }
                productRequest {
                    ...productRequest
                    photoListUrl {
                        id
                        photoUrl
                    }
                }
            }
        }
    }
`
