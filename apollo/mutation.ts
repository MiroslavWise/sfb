import { gql } from "@apollo/client"

export const updateProfile = gql`
    mutation ($fullName: String, $phone: String, $address: String) {
        userUpdate(
            input: { fullName: $fullName, phone: $phone, address: $address }
        ) {
            ok
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
            product {
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
    ) {
        productRequestUpdate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
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
    ) {
        productUpdate(
            input: {
                categoryId: $categoryId
                name: $name
                description: $description
                price: $price
            }
            productId: $productId
        ) {
            ok
        }
    }
`
