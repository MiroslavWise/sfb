import { FC, ReactNode } from "react"

export interface IChildrenProps {
    children: ReactNode
    params?: any
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
    isPaid: boolean
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

export type TDatatypeAttr = "TEXT" | "ENUM"

export interface IProductAttribute {
    datatype: TDatatypeAttr
    description: string
    id: string
    attrId: number
    name: string
    slug: string
    value: string
    valueEnumId: number

    enumGroup: {
        name: string
        id: string
        values: {
            value: string
            id: string
        }[]
    }
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
    photoListUrl: IPhoto[]
    quantity: number
    createdAt: Date
    attributeList: IProductAttribute[]
}

export interface IProduct extends IRequestProduct {
    shop: {
        id: string
        name: string
        address: string
        photoUrl: string
        confirmation: boolean
    }
    photoListUrl: IPhoto[]
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

export type TTabsDetailsRequest = "main" | "proposals" | "testimonials" | any

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
export interface IProductListShopManagement {
    productListShopManagement: {
        totalCount: number
        results: IProduct[]
    }
}
