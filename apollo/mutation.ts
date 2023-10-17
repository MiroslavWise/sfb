import { gql } from "@apollo/client"

export const updateProfile = gql`
    mutation (
        $fullName: String
        # $birthday: Date
        $phone: String
        $address: String
    ) {
        userUpdate(
            input: {
                fullName: $fullName
                # birthday: $birthday
                phone: $phone
                address: $address
            }
        ) {
            ok
        }
    }
`

export const createProduct = gql`
    mutation ($categoryId: UUID, $name: String) {
        productRequestCreate(input: { categoryId: $categoryId, name: $name }) {
            ok
            product {
                id
            }
        }
    }
`
