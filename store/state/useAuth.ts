import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import * as jwt from "jsonwebtoken"

import type { IAuthState, TUseAuth } from "../types/createAuth"

import { serviceAuth } from "@/helpers/services/serviceAuth"

export const initialState: IAuthState = {
    state: "Gates",
    token: undefined,
    refreshToken: undefined,
    expiration: undefined,
    user: undefined,
}

export const useAuth = create(
    persist<TUseAuth>(
        (set, get) => ({
            ...initialState,
            updateUser() {},
            async login(email, password) {
                try {
                    const response = await serviceAuth.login(
                        email.trim(),
                        password.trim(),
                    )
                    const {
                        data: {
                            tokenAuth: {
                                token,
                                refreshToken,
                                refreshExpiresIn,
                                user: {
                                    id,
                                    isAdmin,
                                    isActive,
                                    isSuperuser,
                                    photo,
                                    fullName,
                                    isStaff,
                                },
                            },
                        },
                    } = response
                    if (token && refreshToken && refreshExpiresIn) {
                        set({
                            token: token,
                            refreshToken: refreshToken,
                            expiration: refreshExpiresIn,
                            state: "Main",
                            user: {
                                id,
                                isAdmin,
                                isStaff,
                                isSuperuser,
                                isActive,
                                fullName,
                                photo,
                            },
                        })
                        return {
                            ok: true,
                        }
                    }
                    return { ok: false }
                } catch (e) {
                    console.error("ERROR LOGIN AUTH: ", e)
                    return {
                        ok: false,
                    }
                }
            },
            async refresh() {
                try {
                    if (
                        !isTokenExpired(get().expiration) &&
                        typeof get().expiration === "number"
                    ) {
                        set({ state: "Main" })
                        return {
                            ok: true,
                        }
                    }
                    if (typeof get().refreshToken !== "string") {
                        set((state) => ({
                            ...state,
                            ...initialState,
                            state: "SignIn",
                        }))
                        return {
                            ok: false,
                        }
                    }
                    if (
                        typeof get().expiration === "number" &&
                        isTokenExpired(get().expiration) &&
                        typeof get().refreshToken === "string"
                    ) {
                        const response = await serviceAuth.refresh(
                            get().refreshToken!,
                        )
                        const {
                            data: {
                                refreshToken: {
                                    refreshToken,
                                    refreshExpiresIn,
                                    token,
                                },
                            },
                        } = response ?? {}
                        if (token && refreshToken && refreshExpiresIn) {
                            const expiration = refreshExpiresIn
                            set({
                                token: token,
                                refreshToken: refreshToken,
                                expiration: expiration,
                                state: "Main",
                            })
                            return {
                                ok: true,
                            }
                        }
                        set((state) => ({
                            ...state,
                            ...initialState,
                            state: "SignIn",
                        }))
                        return {
                            ok: false,
                        }
                    }
                    set((state) => ({
                        ...state,
                        ...initialState,
                        state: "SignIn",
                    }))
                    return {
                        ok: false,
                    }
                } catch (e) {
                    console.warn(
                        "---ERROR UPDATE REFRESH TOKEN OR TOKEN--- ",
                        e,
                    )
                    set((state) => ({
                        ...state,
                        ...initialState,
                        state: "SignIn",
                    }))
                    return {
                        ok: false,
                    }
                }
            },
            async out() {
                return await Promise.resolve(
                    set((state) => ({
                        ...state,
                        ...initialState,
                        state: "SignIn",
                    })),
                )
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            partialize(state) {
                return {
                    token: state.token,
                    refreshToken: state.refreshToken,
                    expiration: state.expiration,
                    user: state.user,
                } as TUseAuth
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
