"use client"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"
import Image from "next/image"

export const FooterPhotos = () => {
    const { photos, current, setCurrent } = useVisiblePhotos()

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
                        width={1920}
                        height={1080}
                        unoptimized
                        onClick={() => {
                            setCurrent({ id: item.id })
                        }}
                    />
                </div>
            ))}
        </footer>
    )
}
