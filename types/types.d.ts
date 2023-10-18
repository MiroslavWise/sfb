import { FC, ReactNode } from "react"

export interface IChildrenProps {
    children: ReactNode
}

export type TChildrenProps = FC<IChildrenProps>

export interface IPhotoList {
    photoListUrl: {
        id: string
        isActive: boolean
        isMain: boolean
        photo: string
        photoUrl: string
    }[]
}

export interface IPhotoRequestData {
    productRequestById: IPhotoList
}

export interface IPhotoData {
    productById: IPhotoList
}
