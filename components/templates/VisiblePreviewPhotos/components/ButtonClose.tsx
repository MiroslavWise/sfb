"use client"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

export const ButtonClose = () => {
    const dispatchPhotos = useVisiblePhotos(
        ({ dispatchPhotos }) => dispatchPhotos,
    )

    function handle() {
        dispatchPhotos({ visible: false })
    }

    return (
        <div data-close onClick={handle}>
            <img src="/svg/x-close.svg" alt="close" width={32} height={32} />
        </div>
    )
}
