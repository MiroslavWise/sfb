import type { Dispatch, DispatchWithoutAction } from "react"

export interface IPhotoCarousel {
    id: string
    url: string
    index: number
}

interface IStateVisiblePhoto {
    visible: boolean
    current?: IPhotoCarousel
    photos: IPhotoCarousel[]
}

interface IDispatchPhoto {
    visible: boolean
    current?: {
        id: string
    }
    photos?: IPhotoCarousel[]
}

interface IActionVisiblePhoto {
    setPrev: DispatchWithoutAction
    setNext: DispatchWithoutAction
    setCurrent: Dispatch<{ id: string }>
    dispatchPhotos: Dispatch<IDispatchPhoto>
}

export type TUseVisiblePhotos = IStateVisiblePhoto & IActionVisiblePhoto
