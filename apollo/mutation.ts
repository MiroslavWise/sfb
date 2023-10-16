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
