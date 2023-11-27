"use client"

import Image from "next/image"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

export const LargePhoto = () => {
    const current = useVisiblePhotos(({ current }) => current)
    const setNext = useVisiblePhotos(({ setNext }) => setNext)

    return (
        <section>
            <Image
                onClick={setNext}
                src={current?.url!}
                alt="large"
                height={960}
                width={540}
            />
        </section>
    )
}
