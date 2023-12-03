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
    owner: {
        id: string
    }
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

export interface IDeliveryMethodList {
    deliveryMethodList: {
        name: string
        id: string
        price: string
    }[]
}

export type TOrderOrderStatusChoices = "REGISTERED" | "PAYED" | "EXECUTED" | "REJECTED"
export interface IOrderList {
    orderList: {
        totalCount: number
        results: {
            orderNumber: number
            id: string
            createdAt: Date
            status: TOrderOrderStatusChoices
            totalPrice: string
            deliveryMethod: {
                name: string
                id: string
            }
            cart: {
                id: string
                cartItemList: {
                    id: string
                    createdAt: Date
                    product: IProduct
                }[]
            }
        }[]
    }
}
