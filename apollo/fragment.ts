import { gql } from "@apollo/client"

export const AUTHOR = gql`
    fragment author on UserType {
        id
        fullName
    }
`

export const PHOTOS_REQUEST = gql`
    fragment photosRequest on ProductRequestPhotoType {
        id
        photo
        photoUrl
    }
`

export const PHOTOS = gql`
    fragment photos on ProductPhotoType {
        id
        photo
        photoUrl
    }
`

export const PRODUCT = gql`
    ${AUTHOR}
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
            ...author
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

export const PRODUCT_REQUEST = gql`
    ${AUTHOR}
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
            ...author
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
