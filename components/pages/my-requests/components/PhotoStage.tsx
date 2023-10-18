"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { IPhotoRequestData } from "@/types/types"

import { queryPhotosProductRequestById } from "@/apollo/query"

export const PhotoStage = () => {
    const uuid = useSearchParams().get("request-id")

    const { data: dataPhotos } = useQuery<IPhotoRequestData>(
        queryPhotosProductRequestById,
        {
            variables: { id: uuid },
        },
    )

    const [indexCurrent, setIndexCurrent] = useState<number>(0)

    const images = useMemo(() => {
        if (
            !dataPhotos?.productRequestById ||
            !Array.isArray(dataPhotos?.productRequestById?.photoListUrl)
        ) {
            return []
        }
        return dataPhotos?.productRequestById?.photoListUrl
            ?.filter((item) => item.photoUrl)
            ?.map((item, index) => ({
                item: item,
                index: index,
            }))
    }, [dataPhotos?.productRequestById])

    return (
        <div data-images>
            {images.length ? (
                <motion.div
                    data-image
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={
                            images.find((item) => item.index === indexCurrent)
                                ?.item?.photoUrl!
                        }
                        alt={
                            images.find((item) => item.index === indexCurrent)
                                ?.item?.photo!
                        }
                        width={450}
                        height={450}
                        unoptimized
                    />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                    data-null
                />
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
                        width={450}
                        height={450}
                        unoptimized
                    />
                ))}
            </div>
        </div>
    )
}
