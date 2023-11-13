import { Dispatch, DispatchWithoutAction } from "react"

type TOrderPrice = "price," | "-price,"

interface IStateOrderingProduct {
    price: TOrderPrice
}

interface IActionOrderingProduct {
    dispatchPrice: DispatchWithoutAction
}

export type TUseOrderingProduct = IStateOrderingProduct & IActionOrderingProduct
