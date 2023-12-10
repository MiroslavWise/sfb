import { gql } from "@apollo/client"

export const mutationProductPhotoDelete = gql`
    mutation ($productId: UUID!, $productPhotoId: UUID!) {
        productPhotoDelete(productId: $productId, productPhotoId: $productPhotoId) {
            ok
        }
    }
`

export const mutationProductRequestPhotoDelete = gql`
    mutation ($productRequestId: UUID!, $productRequestPhotoId: UUID!) {
        productRequestPhotoDelete(productRequestId: $productRequestId, productRequestPhotoId: $productRequestPhotoId) {
            ok
        }
    }
`
