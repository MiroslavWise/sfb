import { gql } from "@apollo/client"

const auth = {
    tokenAuth: gql`
        mutation ($email: String!, $password: String!) {
            tokenAuth(email: $email, password: $password) {
                token
                refreshToken
                refreshExpiresIn
                payload
                user {
                    id
                    fullName
                    iin
                    isAdmin
                    isActive
                    isSuperuser
                    photo
                    isStaff
                }
            }
        }
    `,
    refreshToken: gql`
        mutation ($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
                refreshToken
                refreshExpiresIn
                payload
                token
            }
        }
    `,
}

import client from "./initApollo"

export const serviceAuth = {
    login(email: string, password: string) {
        return client.mutate({
            mutation: auth.tokenAuth,
            variables: { email, password },
        })
    },
    refresh(refreshToken: string) {
        return client.mutate({
            mutation: auth.refreshToken,
            variables: { refreshToken },
        })
    },
}
