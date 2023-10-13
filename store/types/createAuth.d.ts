export type TAuthStateType = "SignIn" | "Main" | "Gates"

export interface IReturnDataAuthToken {
    ok: boolean
}
export interface IAuthState {
    state: TAuthStateType
    token: string | undefined
    refreshToken: string | undefined
    expiration: number | undefined
    user:
        | {
              id: number
              fullName: string
              isAdmin: boolean
              isActive: boolean
              isSuperuser: boolean
              photo: string | null
              isStaff: boolean
          }
        | undefined
}

export interface IAuthAction {
    login: (email: string, password: string) => Promise<IReturnDataAuthToken>
    refresh: () => Promise<IReturnDataAuthToken>
    out: () => Promise<void>
}

export type TUseAuth = IAuthState & IAuthAction
