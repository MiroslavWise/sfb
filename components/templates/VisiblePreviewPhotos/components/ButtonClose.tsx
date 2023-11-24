"use client"

import Image from "next/image"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

export const ButtonClose = () => {
    const { dispatchPhotos } = useVisiblePhotos((_) => ({
        dispatchPhotos: _.dispatchPhotos,
    }))

    function handle() {
        dispatchPhotos({ visible: false })
    }

    return (
        <div data-close onClick={handle}>
            <Image src="/svg/x-close.svg" alt="close" width={32} height={32} />
        </div>
    )
}
