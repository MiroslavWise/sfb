import type { DispatchWithoutAction, FC } from "react"

export interface IFilter {
    typePrice?: boolean

    dispatchPrice?: DispatchWithoutAction
}

export type TFilter = FC<IFilter>
