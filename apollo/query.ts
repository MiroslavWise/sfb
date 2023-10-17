import { gql } from "@apollo/client"

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
        }
    }
`
