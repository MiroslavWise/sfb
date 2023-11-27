"use client"

import Image from "next/image"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

export const FooterPhotos = () => {
    const current = useVisiblePhotos(({ current }) => current)
    const photos = useVisiblePhotos(({ photos }) => photos)
    const setCurrent = useVisiblePhotos(({ setCurrent }) => setCurrent)

    return (
        <footer>
            {photos.map((item) => (
                <div
                    data-mini-photo
                    data-active={item.id === current?.id}
                    key={item?.id}
                >
                    <Image
                        src={item.url}
                        alt="mini"
                        width={960}
                        height={540}
                        onClick={() => {
                            setCurrent({ id: item.id })
                        }}
                    />
                </div>
            ))}
        </footer>
    )
}
