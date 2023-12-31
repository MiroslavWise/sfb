"use client"

import Image from "next/image"
import { useState, memo } from "react"

import type { IPhoto } from "@/types/types"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

import styles from "./style.module.scss"

const $PhotoStage = (props: { images: { item: IPhoto; index: number }[] }) => {
    const { images } = props ?? {}
    const [indexCurrent, setIndexCurrent] = useState<number>(0)
    const dispatchPhotos = useVisiblePhotos(({ dispatchPhotos }) => dispatchPhotos)

    return (
        <div className={styles.wrapper} data-photos>
            {images.length ? (
                <div data-image>
                    <Image
                        src={images.find((item) => item.index === indexCurrent)?.item?.photoUrl!}
                        alt={images.find((item) => item.index === indexCurrent)?.item?.photo!}
                        onClick={() => {
                            dispatchPhotos({
                                visible: true,
                                current: {
                                    id: images.find((item) => item.index === indexCurrent)?.item?.id!,
                                },
                                photos: images.map((item) => ({
                                    id: item.item.id,
                                    index: item.index,
                                    url: item.item.photoUrl!,
                                })),
                            })
                        }}
                        unoptimized
                        width={450}
                        height={450}
                    />
                </div>
            ) : (
                <div data-null />
            )}
            <div data-scope-images>
                {images.map((file) => (
                    <Image
                        key={`${file.item.id}-${file.item.photo}`}
                        data-active={file.index === indexCurrent}
                        onClick={() => {
                            setIndexCurrent(file.index)
                        }}
                        src={file.item.photoUrl}
                        alt={file.item.photo}
                        unoptimized
                        width={450}
                        height={450}
                    />
                ))}
            </div>
        </div>
    )
}

export const PhotoStage = memo($PhotoStage)
