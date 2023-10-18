export interface IRequestProductRoot {
    productRequestById: IRequestProduct
}

export interface IRequestProduct {
    id: string
    category: {
        id: string
        name: string
    }
    name: string
    description: string
    price: number
    author: {
        id: string
        fullName: string
    }
    city: {
        id: string
        name: string
    }
    commercial: boolean
    isActive: boolean
    draft: boolean
    photoListUrl: {
        id: string
        photoUrl: string
    }[]
}
