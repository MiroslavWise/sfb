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
                    isAdmin
                    isActive
                    isSuperuser
                    photo
                    isStaff
                    isCommercial
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
    userRegistration: gql`
        mutation (
            $email: String!
            $isSeller: Boolean!
            $password: String!
            $phone: String!
        ) {
            userRegistration(
                email: $email
                isSeller: $isSeller
                password: $password
                phone: $phone
            ) {
                ok
                user {
                    id
                    email
                    fullName
                    photo
                    birthday
                    phone
                    isStaff
                    isActive
                    isAdmin
                    isSuperuser
                    isCommercial
                }
                errors {
                    field
                    messages
                }
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
    register({ email, isSeller, password, phone }: IValuesRegister) {
        return client.mutate({
            mutation: auth.userRegistration,
            variables: { email, isSeller, password, phone },
        })
    },
}

export interface IValuesRegister {
    email: string
    isSeller: boolean
    password: string
    phone: string
}
