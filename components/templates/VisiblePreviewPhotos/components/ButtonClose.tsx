"use client"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"
import Image from "next/image"

export const ButtonClose = () => {
    const { dispatchPhotos } = useVisiblePhotos()

    function handle() {
        dispatchPhotos({ visible: false })
    }

    return (
        <div data-close onClick={handle}>
            <Image src="/svg/x-close.svg" alt="close" width={32} height={32} />
        </div>
    )
}
