



export interface IUseAuth{
    state: AuthStateType
    token: string | undefined
    refreshToken: string | undefined
    expiration: number | undefined
}