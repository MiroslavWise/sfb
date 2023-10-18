import { gql } from "@apollo/client"

export const PHOTOS_REQUEST = gql`
    fragment photosRequest on ProductRequestPhotoType {
        id
        photo
        isMain
        isActive
        photoUrl
    }
`

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

export const PRODUCT_REQUEST = gql`
    fragment productRequest on ProductRequestType {
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
        draft
    }
`
