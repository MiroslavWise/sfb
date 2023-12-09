"use client"

import { memo, useEffect } from "react"
import { InMemoryCache } from "@apollo/client/core"
import { ApolloClient, ApolloProvider, HttpLink, ApolloLink } from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { CONFIG_ENV } from "@/helpers/config/ENV"

let tokenAuth: string | undefined

const httpLink = new HttpLink({ uri: CONFIG_ENV.urlGraphQL })

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
        return {
            headers: {
                ...headers,
                authorization: tokenAuth
                    ? `JWT ${tokenAuth}`
                    : JSON.parse(localStorage.getItem("auth")!).state.token
                    ? `JWT ${JSON.parse(localStorage.getItem("auth")!).state.token}`
                    : null,
            },
        }
    })

    return forward(operation)
}).concat(httpLink)

const link = authMiddleware

const cache = new InMemoryCache({})

export const client = new ApolloClient({
    link,
    cache,
    ssrMode: false,
    credentials: "include",
    connectToDevTools: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            nextFetchPolicy: "cache-and-network",
        },
    },
})

export const ApolloProviderContext = memo(function ApolloProviderContext({ children }: IChildrenProps) {
    const token = useAuth(({ token }) => token)
    useEffect(() => {
        tokenAuth = token
    }, [token])

    return <ApolloProvider client={client}>{children}</ApolloProvider>
})
