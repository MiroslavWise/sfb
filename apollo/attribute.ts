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
