import { create } from "zustand"
import type { TUseOrderingProduct } from "../types/createOrderingProduct"

export const useOrderingProduct = create<TUseOrderingProduct>((set, get) => ({
    price: "price,",

    dispatchPrice() {
        set({ price: get().price === "-price," ? "price," : "-price," })
    },
}))
