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

interface ICategory {
    id: string
    name: string
    iconName: string
}

export interface ICategoryList {
    categoryRootList: (ICategory & {
        childrenList: ICategory[]
    })[]
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

export interface IProductAttribute {
    attrId: number
    datatype: string
    id: string
    slug: string
    name: string
    value: string
    valueBool: boolean
    valueText: string
    valueInt: number
    valueId: number
}

export interface IProductAttributeList {
    productAttributesByCategoryId: {
        attribute: IProductAttribute[]
    } | null
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

export interface IProduct extends IRequestProduct {
    attributeList: IProductAttribute[]
}

export interface IProductRoot {
    productById: IProduct
}

export interface IProductOfferItem {
    id: string
    createdAt: Date
    product: IProduct
    productRequest: IRequestProduct
}

export interface IProductOfferListRoot {
    productOfferList: {
        totalCount: number
        results: IProductOfferItem[]
    }
}

export type TTabsDetailsRequest = "main" | "proposals" | "testimonials"

export interface ICategoriesChildren {
    id: string
    name: string
    iconName: string
    photoUrl: string
    childrenList: ICategoriesChildren[]
}

export interface ICategoriesRoot {
    categoryRootList: ICategoriesChildren[]
}

export interface IRecommendation {
    name: string
    id: string
    family: {
        id: string
        name: string
    }[]
}

export interface ICategoryRecommendation {
    categoryRecommendation: IRecommendation[]
}

export interface IProductList {
    productList: {
        totalCount: number
        results: IProduct[]
    }
}
