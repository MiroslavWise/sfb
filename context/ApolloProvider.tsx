"use client"

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
} from "@apollo/client"

import type { IChildrenProps } from "@/types/types"

import { CONFIG_ENV } from "@/helpers/config/ENV"
import { useAuth } from "@/store/state/useAuth"

const httpLink = new HttpLink({ uri: CONFIG_ENV.urlGraphQL })

const authMiddleware = (token: string) =>
    new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: token
                    ? `JWT ${token}`
                    : JSON.parse(localStorage.getItem("auth")!).state.token
                    ? `JWT ${
                          JSON.parse(localStorage.getItem("auth")!).state.token
                      }`
                    : null,
            },
        }))

        return forward(operation)
    }).concat(httpLink)

const links = (token: string) => authMiddleware(token)

export const client = (value?: string) =>
    new ApolloClient({
        ssrMode: true,
        uri: CONFIG_ENV.urlGraphQL,
        link: links(value!),
        cache: new InMemoryCache({}),
        credentials: "include",
        connectToDevTools: true,
        defaultOptions: {
            watchQuery: {
                nextFetchPolicy: "cache-first",
            },
            
        },
    })

export const ApolloProviderContext = ({ children }: IChildrenProps) => {
    const { token } = useAuth()

    return <ApolloProvider client={client(token)}>{children}</ApolloProvider>
}
