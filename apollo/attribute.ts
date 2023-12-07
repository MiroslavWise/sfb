import { gql } from "@apollo/client"

export const queryProductAttributesByCategoryId = gql`
    query ($categoryId: UUID!) {
        productAttributesByCategoryId(categoryId: $categoryId) {
            createdAt
            updatedAt
            id
            attribute {
                id
                slug
                description
                name
                datatype

                enumGroup {
                    name
                    id
                    values {
                        value
                        id
                    }
                }
            }
        }
    }
`

export const mutationProductAttributeUpdate = gql`
    mutation ($attrId: Int!, $attrValueId: Int!, $productId: UUID!) {
        productAttributeUpdate(attrId: $attrId, attrValueId: $attrValueId, productId: $productId) {
            ok
        }
    }
`

export const queryCategoryRecommendation = gql`
    query ($search: String) {
        categoryRecommendation(search: $search) {
            name
            id
        }
    }
`

export const mutationProductRequestAttributeUpdate = gql`
    mutation ($attrId: Int!, $productRequestId: UUID!, $attrValueId: Int!) {
        productRequestAttributeUpdate(attrId: $attrId, productRequestId: $productRequestId, attrValueId: $attrValueId) {
            ok
        }
    }
`
