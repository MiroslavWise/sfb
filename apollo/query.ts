import { gql } from "@apollo/client"
import { PRODUCT, PRODUCT_REQUEST, PHOTOS_REQUEST, PHOTOS } from "./fragment"

export const me = gql`
    query {
        me {
            id
            email
            fullName
            photo
            phone
            address
            isStaff
            isAdmin
            isSeller
            isSuperuser
            photo
        }
    }
`

export const categories = gql`
    query {
        categoryList {
            id
            name
            iconName
        }
    }
`

export const regions = gql`
    query {
        regionList {
            id
            name
        }
    }
`

export const areas = gql`
    query {
        areaList {
            id
            name
        }
    }
`
export const city = gql`
    query {
        cityList {
            id
            name
        }
    }
`

export const productRequestListMe = gql`
    ${PRODUCT_REQUEST}
    query ($offset: Int) {
        productRequestListMe(limit: 20, offset: $offset) {
            totalCount
            results {
                ...productRequest
                photoListUrl {
                    id
                    photoUrl
                }
            }
        }
    }
`

export const productRequestListMe_ID_NAME = gql`
    query {
        productRequestListMe {
            totalCount
            results {
                id
                name
            }
        }
    }
`

export const productListMe_ID_NAME = gql`
    query {
        productListMe(draft: false) {
            totalCount
            results {
                id
                name
            }
        }
    }
`

export const queryProductListMe = gql`
    ${PRODUCT}
    query ($offset: Int) {
        productListMe(limit: 20, offset: $offset) {
            totalCount
            results {
                ...product
                photoListUrl {
                    id
                    photoUrl
                }
            }
        }
    }
`

export const productRequestList = gql`
    ${PRODUCT_REQUEST}
    query ($offset: Int) {
        productRequestList(limit: 10, offset: $offset) {
            totalCount
            results {
                ...productRequest
            }
        }
    }
`

export const queryPhotosProductRequestById = gql`
    ${PHOTOS_REQUEST}
    query ($id: UUID!) {
        productRequestById(id: $id) {
            photoListUrl {
                ...photosRequest
            }
        }
    }
`

export const queryPhotosProductById = gql`
    ${PHOTOS}
    query ($id: UUID!) {
        productById(id: $id) {
            photoListUrl {
                ...photos
            }
        }
    }
`

export const queryProductList = gql`
    ${PRODUCT}
    query ($offset: Int) {
        productList(limit: 10, offset: $offset) {
            totalCount
            results {
                ...product
            }
        }
    }
`

export const queryProductById = gql`
    ${PRODUCT}
    query ($id: UUID!) {
        productById(id: $id) {
            ...product
        }
    }
`

export const queryProductRequestById = gql`
    ${PRODUCT_REQUEST}
    query ($id: UUID!) {
        productRequestById(id: $id) {
            ...productRequest
        }
    }
`

export const queryTotalCountProfileAside = gql`
    query {
        productListMe {
            totalCount
        }
        productRequestListMe {
            totalCount
        }
        chatList {
            totalCount
        }
    }
`

export const queryNotificationList = gql`
    query {
        notificationList(isRead: false) {
            totalCount
            results {
                createdAt
                updatedAt
                id
                target {
                    id
                }
                fromUser {
                    id
                }
                redirectUrl
                redirectShortUrl
                verb
                isRead
            }
        }
    }
`

export const queryNotificationTotal = gql`
    query {
        notificationList(isRead: false) {
            totalCount
        }
    }
`
