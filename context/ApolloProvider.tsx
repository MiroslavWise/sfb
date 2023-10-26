"use client"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
} from "@apollo/client"
import { memo } from "react"

import type { IChildrenProps } from "@/types/types"

import { CONFIG_ENV } from "@/helpers/config/ENV"

const httpLink = new HttpLink({ uri: CONFIG_ENV.urlGraphQL })

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: JSON.parse(localStorage.getItem("auth")!).state.token
                ? `JWT ${JSON.parse(localStorage.getItem("auth")!).state.token}`
                : null,
        },
    }))

    return forward(operation)
}).concat(httpLink)

const links = authMiddleware

export const client = new ApolloClient({
    ssrMode: false,
    link: links,
    cache: new InMemoryCache({}),
    credentials: "include",
    connectToDevTools: true,
    defaultOptions: {
        watchQuery: {
            nextFetchPolicy: "cache-first",
        },
    },
})

export const ApolloProviderContext = memo(function Apollo({
    children,
}: IChildrenProps) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
})
