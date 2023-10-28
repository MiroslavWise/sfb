import { create } from "zustand"
import { TUseVisiblePhotos } from "../types/createVisiblePhotosCarousel"

export const useVisiblePhotos = create<TUseVisiblePhotos>((set, get) => ({
    visible: false,
    photos: [],

    setPrev() {
        const currentIndex =
            get().photos.findIndex(
                (item) => item.index === get()?.current?.index!,
            ) || 0
        const length = get().photos.length
        if (length <= 1) {
            return
        }
        if (currentIndex === 0) {
            set({ current: get().photos[length - 1] })
        } else {
            set({ current: get().photos[currentIndex - 1] })
        }
    },
    setNext() {
        const currentIndex = get().photos.findIndex(
            (item) => item.index === get()?.current?.index,
        )
        const length = get().photos.length
        if (length <= 1) {
            return
        }
        if (currentIndex === length - 1) {
            set({ current: get().photos[0] })
        } else {
            set({ current: get().photos[currentIndex + 1] })
        }
    },
    setCurrent({ id }) {
        if (typeof id !== "undefined") {
            set({ current: get().photos?.find((item) => item.id === id) })
        }
    },
    dispatchPhotos({ visible, current, photos }) {
        if (!visible) {
            set({ current: undefined, photos: [], visible: false })
        } else {
            set({
                visible: true,
                current: photos?.find((item) => item.id === current?.id),
                photos: photos,
            })
        }
    },
}))
