import { Dispatch, DispatchWithoutAction } from "react"

export type TAuthStateType = "SignIn" | "Main" | "Gates"

export interface IReturnDataAuthToken {
    ok: boolean
}

interface IDateUser {
    id: string
    fullName: string
    isAdmin: boolean
    isActive: boolean
    isSuperuser: boolean
    photo: string | null
    isStaff: boolean
    isCommercial: boolean
}
export interface IAuthState {
    state: TAuthStateType
    token: string | undefined
    refreshToken: string | undefined
    expiration: number | undefined
    user: IDateUser | undefined
}

export interface IAuthAction {
    updateUser: DispatchWithoutAction

    setUserData: Dispatch<IDateUser>
    login: (email: string, password: string) => Promise<IReturnDataAuthToken>
    refresh: () => Promise<IReturnDataAuthToken>
    out: () => Promise<void>
}

export type TUseAuth = IAuthState & IAuthAction
