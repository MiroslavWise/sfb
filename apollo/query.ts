import { gql } from "@apollo/client"

export const me = gql`
    query {
        me {
            id
            email
            fullName
            birthday
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
