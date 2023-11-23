import { IProduct } from "./types"

export interface IShop {
    id: string
    name: string
    description: string
    shopPhoto: string
    confirmation: boolean
    address: string
    phone: string
    photoUrl: string
}

export interface IListShop {
    shopList: {
        totalCount: number
        results: IShop[]
    }
}

export interface IShopById {
    shopById: IShop
}

export interface ICart {
    id: string
    quantity: number
    product: IProduct
}

export interface ICartList {
    cart: {
        id: string
        cartItemList: ICart[]
        cartTotalSum: number
    }
}
