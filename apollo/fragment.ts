import { gql } from "@apollo/client"

export const PHOTOS = gql`
    fragment photos on ProductPhotoType {
        id
        photo
        isMain
        isActive
        photoUrl
    }
`

export const PRODUCT = gql`
    ${PHOTOS}
    fragment product on ProductType {
        id
        category {
            id
            name
        }
        name
        description
        price
        author {
            id
            fullName
        }
        city {
            id
            name
        }
        commercial
        isActive
        photoListUrl {
            ...photos
        }
    }
`
