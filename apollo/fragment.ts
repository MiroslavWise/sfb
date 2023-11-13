import { gql } from "@apollo/client"

export const AUTHOR = gql`
    fragment author on UserType {
        id
        fullName
        photo
        address
        city {
            id
            name
            region {
                id
                name
            }
        }
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

export const ProductAttribute = gql`
    fragment ProductAttribute on ProductAttributeType {
        attrId
        datatype
        name
        value
        valueBool
        valueText
        valueInt
        valueId
    }
`

export const PRODUCT = gql`
    ${AUTHOR}
    ${ProductAttribute}
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
        createdAt
        commercial
        isActive
        draft
        quantity
        attributeList {
            ...ProductAttribute
        }
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
        quantity
        createdAt
    }
`

export const CHAT = gql`
    ${PHOTOS}
    ${PHOTOS_REQUEST}
    fragment chat on ChatProductRequestType {
        createdAt
        updatedAt
        id
        product {
            id
            name
            price
            photoListUrl {
                ...photos
            }
        }
        productRequest {
            id
            name
            price
            photoListUrl {
                ...photosRequest
            }
        }
        seller {
            id
            fullName
            photo
        }
        buyer {
            id
            fullName
            photo
        }
    }
`
