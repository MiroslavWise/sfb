import { FC, ReactNode } from "react"

export interface IChildrenProps {
    children: ReactNode
}

export type TChildrenProps = FC<IChildrenProps>

export interface IPhoto {
    id: string
    isActive: boolean
    isMain: boolean
    photo: string
    photoUrl: string
}

export interface IAuthor {
    id: string
    fullName: string
    photo: string
    address: string
    city: {
        id: string
        name: string
        region: {
            id
            name
        }
    }
}
export interface IPhotoList {
    photoListUrl: IPhoto[]
}

export interface IPhotoProductRequestData {
    productRequestById: IPhotoList
}

export interface IPhotoProductData {
    productById: IPhotoList
}

export interface IPhotoData {
    productById: IPhotoList
}

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
    author: IAuthor
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
    quantity: number
    createdAt: Date
}

export interface IProduct extends IRequestProduct {}

export interface IProductRoot {
    productById: IProduct
}

export interface IProductOfferItem {
    id: string
    createdAt: Date
    product: IRequestProduct
    productRequest: IRequestProduct
}

export interface IProductOfferListRoot {
    productOfferList: {
        totalCount: number
        results: IProductOfferItem[]
    }
}

export type TTabsDetailsRequest = "main" | "proposals" | "testimonials"
