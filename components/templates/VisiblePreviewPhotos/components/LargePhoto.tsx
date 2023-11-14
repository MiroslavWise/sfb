"use client"

import Image from "next/image"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

export const LargePhoto = () => {
    const { current, setNext } = useVisiblePhotos()

    return (
        <section>
            <Image
                onClick={setNext}
                src={current?.url!}
                alt="large"
                width={1080}
                height={1920}
                unoptimized
            />
        </section>
    )
}