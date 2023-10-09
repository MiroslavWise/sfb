import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import * as jwt from "jsonwebtoken"

import type { IUseAuth } from "../types/createAuth"

export const useAuth = create(
    persist<IUseAuth>(
        (set, get) => ({
            state: "Gates",
            token: undefined,
            refreshToken: undefined,
            expiration: undefined,
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            partialize(state) {
                return {
                    token: state.token,
                    refreshToken: state.refreshToken,
                    expiration: state.expiration,
                } as IUseAuth
            },
        },
    ),
)

function decodeJwt(token: string): number | undefined {
    try {
        const decodedPayload: any = jwt.decode(token, { complete: true })
        const expirationTime: number | undefined = decodedPayload?.payload?.exp

        if (expirationTime !== undefined) {
            return expirationTime
        }
    } catch (error) {
        console.error("Error decoding JWT:", error)
        return undefined
    }

    return undefined
}

function isTokenExpired(exp: number | undefined) {
    if (exp !== undefined) {
        const currentTime: number = Math.floor(Date.now() / 1000)
        return exp < currentTime
    }
}
