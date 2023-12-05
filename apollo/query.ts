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
            isCommercial
            photo
            city {
                id
                name
                region {
                    id
                    name
                }
            }
        }
    }
`

export const queryCategoriesRoot = gql`
    query {
        categoryRootList {
            id
            name
            iconName
            photoUrl
            childrenList {
                id
                name
                iconName
                childrenList {
                    id
                    name
                    iconName
                }
            }
        }
    }
`

export const queryCategories = gql`
    query {
        categoryList {
            id
            name
            iconName
        }
    }
`

export const queryRegions = gql`
    query {
        regionList {
            id
            name
        }
    }
`
export const queryArea = gql`
    {
        areaList {
            id
            name
        }
    }
`

export const queryCity = gql`
    query {
        cityList {
            id
            name
            region {
                id
                name
            }
        }
    }
`

export const productRequestListMe = gql`
    ${PRODUCT_REQUEST}
    query ($offset: Int) {
        productRequestListMe(limit: 20, offset: $offset, isActive: true) {
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
    query ($offset: Int, $ordering: String) {
        productListMe(limit: 20, offset: $offset, ordering: $ordering, isActive: true) {
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
export const queryProductListMeArchive = gql`
    ${PRODUCT}
    query ($offset: Int) {
        productListMe(limit: 20, offset: $offset, isActive: false) {
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

export const queryProductListMeTotalArchive = gql`
    query {
        productListMe(isActive: false) {
            totalCount
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
    query ($offset: Int, $categoryId: String) {
        productList(limit: 16, offset: $offset, categoryId: $categoryId, isActive: true) {
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

export const queryProductById = gql`
    ${PRODUCT}
    ${PHOTOS}
    query ($id: UUID!) {
        productById(id: $id) {
            ...product
            photoListUrl {
                ...photos
            }
        }
    }
`

export const queryProductListShopManagement = gql`
    ${PRODUCT}
    ${PHOTOS}
    query ($shopId: UUID) {
        productListShopManagement(shopId: $shopId) {
            totalCount
            results {
                ...product
                photoListUrl {
                    ...photos
                }
            }
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
        productListMe(isActive: true) {
            totalCount
        }
        productRequestListMe(isActive: true) {
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

export const queryFavoriteProductList = gql`
    ${PRODUCT}
    {
        favoriteProductList {
            totalCount
            results {
                id
                user {
                    id
                    fullName
                    photo
                }
                product {
                    ...product
                    photoListUrl {
                        id
                        photoUrl
                    }
                }
            }
        }
    }
`

export const queryProductListShopId = gql`
    ${PRODUCT}
    ${PHOTOS}
    query ($shopId: UUID) {
        productList(shopId: $shopId) {
            totalCount
            results {
                ...product
                photoListUrl {
                    ...photos
                }
            }
        }
    }
`
