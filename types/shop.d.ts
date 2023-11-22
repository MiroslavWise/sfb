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
