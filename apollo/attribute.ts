import { gql } from "@apollo/client"

export const queryProductAttributesByCategoryId = gql`
    query ($categoryId: UUID!) {
        productAttributesByCategoryId(categoryId: $categoryId) {
            category {
                id
                name
            }
            attribute {
                id
                name
                datatype
                slug
            }
        }
    }
`
