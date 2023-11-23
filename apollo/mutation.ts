import { gql } from "@apollo/client"

export const updateProfile = gql`
    mutation (
        $fullName: String
        $phone: String
        $address: String
        $cityId: UUID
    ) {
        userUpdate(
            input: {
                fullName: $fullName
                phone: $phone
                address: $address
                cityId: $cityId
            }
        ) {
            ok
        }
    }
`

export const createProductRequestEmpty = gql`
    mutation {
        productRequestCreate(input: { draft: true }) {
            ok
            productRequest {
                id
            }
        }
    }
`

export const createProductRequestSmall = gql`
    mutation ($categoryId: UUID, $name: String) {
        productRequestCreate(
            input: { categoryId: $categoryId, name: $name, draft: true }
        ) {
            ok
            productRequest {
                id
            }
        }
    }
`

export const createProductRequestFull = gql`
    mutation (
        $categoryId: UUID
        $name: String
        $description: String
        $price: Float
    ) {
        productRequestCreate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
            }
        ) {
            ok
            productRequest {
                id
            }
        }
    }
`

export const createProductSmall = gql`
    mutation ($categoryId: UUID, $name: String) {
        productCreate(
            input: { categoryId: $categoryId, name: $name, draft: true }
        ) {
            ok
            product {
                id
            }
        }
    }
`

export const createProductFull = gql`
    mutation (
        $categoryId: UUID
        $name: String
        $description: String
        $price: Float
    ) {
        productCreate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
            }
        ) {
            ok
            product {
                id
            }
        }
    }
`

export const mutateUpdateProductRequest = gql`
    mutation (
        $productRequestId: UUID!
        $categoryId: UUID
        $name: String
        $description: String
        $price: Float
        $quantity: Int
    ) {
        productRequestUpdate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
                quantity: $quantity
            }
            productRequestId: $productRequestId
        ) {
            ok
        }
    }
`

export const mutateUpdateProductRequestDraft = gql`
    mutation ($productRequestId: UUID!) {
        productRequestUpdate(
            input: { draft: false }
            productRequestId: $productRequestId
        ) {
            ok
        }
    }
`

export const mutateUpdateProductDraft = gql`
    mutation ($productId: UUID!) {
        productUpdate(input: { draft: false }, productId: $productId) {
            ok
        }
    }
`

export const mutateUpdateProduct = gql`
    mutation (
        $productId: UUID!
        $categoryId: UUID
        $name: String
        $description: String
        $price: Float
        $quantity: Int
    ) {
        productUpdate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
                quantity: $quantity
            }
            productId: $productId
        ) {
            ok
        }
    }
`

export const mutateChatMessageCreate = gql`
    mutation ($chatId: UUID!, $text: String!) {
        chatMessageCreate(chatId: $chatId, text: $text) {
            ok
            errors {
                field
                messages
            }
        }
    }
`

export const mutateChatCreate = gql`
    mutation ($productId: UUID!, $productRequestId: UUID!) {
        chatCreate(productId: $productId, productRequestId: $productRequestId) {
            ok
            chat {
                id
            }
        }
    }
`

export const mutateNotificationReadAll = gql`
    mutation {
        notificationReadAll {
            ok
        }
    }
`

export const mutateReadNotification = gql`
    mutation ($notificationId: UUID!) {
        notificationReadById(notificationId: $notificationId) {
            ok
        }
    }
`

export const mutationProductDelete = gql`
    mutation ($productId: UUID!) {
        productDelete(productId: $productId) {
            ok
        }
    }
`

export const mutationProductRequestUpdate = gql`
    mutation ($productRequestId: UUID!) {
        productRequestUpdate(
            productRequestId: $productRequestId
            input: { isActive: false }
        ) {
            ok
        }
    }
`

export const mutationFavoriteProductAdd = gql`
    mutation ($productId: UUID!) {
        favoriteProductAdd(productId: $productId) {
            ok
            favorite {
                id
                product {
                    id
                }
            }
            errors {
                messages
            }
        }
    }
`

export const mutationFavoriteProductDelete = gql`
    mutation ($favoriteId: UUID!) {
        favoriteProductDelete(favoriteId: $favoriteId) {
            ok
            errors {
                messages
            }
        }
    }
`

export const mutationShopCreate = gql`
    mutation ($name: String, $description: String, $address: String) {
        shopCreate(
            input: { name: $name, description: $description, address: $address }
        ) {
            ok
            shop {
                id
            }
            errors {
                messages
            }
        }
    }
`

export const mutationShopUpdate = gql`
    mutation (
        $shopId: UUID!
        $name: String
        $description: String
        $address: String
    ) {
        shopUpdate(
            shopId: $shopId
            input: { name: $name, description: $description, address: $address }
        ) {
            ok
            errors {
                messages
            }
        }
    }
`

export const mutationCartItemAdd = gql`
    mutation ($productId: UUID!, $quantity: Int) {
        cartItemAdd(productId: $productId, quantity: $quantity) {
            ok
            errors {
                messages
            }
            cart {
                id
            }
        }
    }
`

export const queryCartItemUpdate = gql`
    mutation ($cartItemId: UUID!, $quantity: Int!) {
        cartItemUpdate(cartItemId: $cartItemId, quantity: $quantity) {
            ok
            errors {
                messages
            }
        }
    }
`

export const mutationCartItemDelete = gql`
    mutation ($cartItemId: UUID!) {
        cartItemDelete(cartItemId: $cartItemId) {
            ok
            errors {
                messages
            }
        }
    }
`
