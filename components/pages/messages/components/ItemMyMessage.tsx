"use client"

import { memo, useMemo } from "react"
import Image from "next/image"

import type { TItemMessage } from "../types/types"
import type { TTypeMessage } from "@/types/chat"
import { type INewMessage } from "@/helpers/hooks/useJoinMessage"
import { type IPhotoCarousel } from "@/store/types/createVisiblePhotosCarousel"

import { cx } from "@/helpers/lib/cx"
import { stylesBlockRight } from "@/helpers/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/helpers/lib/timeNowOrBefore"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

import styles from "../styles/item-message.module.scss"

const $ItemMyMessage: TItemMessage = ({ photo, messages }) => {
    const { dispatchPhotos } = useVisiblePhotos()

    const newMessages: (INewMessage & {
        dataImages?: {
            type: TTypeMessage
            url: string
        }[]
    })[] = useMemo(() => {
        const array: (INewMessage & {
            dataImages?: {
                type: TTypeMessage
                url: string
            }[]
        })[] = []

        messages.forEach((item) => {
            if (item.type === "TEXT") {
                array.push(item)
            }
            if (["IMAGE", "VIDEO"].includes(item.type)) {
                if (["IMAGE", "VIDEO"]?.includes(array.at(-1)?.type!)) {
                    if (
                        Array.isArray(array.at(-1)?.dataImages) &&
                        array.at(-1) &&
                        array.at(-1)?.dataImages
                    ) {
                        //@ts-ignore
                        array.at(-1).dataImages! = [
                            ...array.at(-1)?.dataImages!,
                            {
                                type: item.type,
                                url: item.photoUrl!,
                            },
                        ]
                    }
                } else {
                    array.push({
                        ...item,
                        dataImages: [
                            {
                                type: item.type,
                                url: item.photoUrl!,
                            },
                        ],
                    })
                }
            }
        })

        return array
    }, [messages])

    console.log("%c newMessages: ", "color: #f0f", newMessages)

    return (
        <li className={cx(styles.containerItemMyMessage)}>
            <div className={styles.messages}>
                {newMessages?.map((item, index) => {
                    if (item?.type === "TEXT") {
                        return (
                            <div
                                className={cx(
                                    styles.blockMessage,
                                    styles[
                                        stylesBlockRight(
                                            messages?.length!,
                                            index,
                                        )
                                    ],
                                )}
                                key={`${item.id}_${item.message}`}
                                id={`${item.id!}`}
                            >
                                <p>{item.message}</p>
                                <p className={styles.time}>
                                    {timeNowOrBeforeChat(item?.time)}
                                </p>
                            </div>
                        )
                    }
                    if (["IMAGE", "VIDEO"].includes(item.type)) {
                        return (
                            <div
                                className={cx(
                                    styles.blockMessage,
                                    styles[
                                        stylesBlockRight(
                                            messages?.length!,
                                            index,
                                        )
                                    ],
                                )}
                                data-images-block
                                key={`${item.id}_${item.id}`}
                                id={`${item.id!}`}
                                onClick={() => {
                                    const photos: IPhotoCarousel[] = messages
                                        ?.filter(
                                            (item) => item.type === "IMAGE",
                                        )
                                        ?.map((item, index) => ({
                                            id: item.id,
                                            index: index,
                                            url: item.photoUrl!,
                                        }))
                                    dispatchPhotos({
                                        visible: true,
                                        current: {
                                            id: item.id!,
                                        },
                                        photos: photos,
                                    })
                                }}
                            >
                                {item.dataImages?.map((item_) => {
                                    if (item_.type === "IMAGE") {
                                        return (
                                            <Image
                                                key={item_.url}
                                                src={item_.url!}
                                                alt="photo"
                                                width={250}
                                                height={250}
                                                unoptimized
                                            />
                                        )
                                    }
                                    if (item_.type === "VIDEO") {
                                        ;<video
                                            width={400}
                                            height={300}
                                            controls
                                        >
                                            <source
                                                src={item_.url}
                                                type="video/mp4"
                                            />
                                        </video>
                                    }
                                    return null
                                })}
                            </div>
                        )
                    }
                    // if (item.type === "IMAGE") {
                    //     return (
                    //         <div
                    //             className={cx(
                    //                 styles.blockMessage,
                    //                 styles[
                    //                     stylesBlockRight(
                    //                         messages?.length!,
                    //                         index,
                    //                     )
                    //                 ],
                    //             )}
                    //             data-image
                    //             key={`${item.id}_${item.message}`}
                    //             id={`${item.id!}`}
                    //             onClick={() => {
                    //                 const photos: IPhotoCarousel[] = messages
                    //                     ?.filter(
                    //                         (item) => item.type === "IMAGE",
                    //                     )
                    //                     ?.map((item, index) => ({
                    //                         id: item.id,
                    //                         index: index,
                    //                         url: item.photoUrl!,
                    //                     }))
                    //                 dispatchPhotos({
                    //                     visible: true,
                    //                     current: {
                    //                         id: item.id!,
                    //                     },
                    //                     photos: photos,
                    //                 })
                    //             }}
                    //         >
                    //             <Image
                    //                 src={item?.photoUrl!}
                    //                 alt="photo"
                    //                 width={250}
                    //                 height={250}
                    //                 unoptimized
                    //             />
                    //         </div>
                    //     )
                    // }
                    // if (item.type === "VIDEO") {
                    //     return (
                    //         <div
                    //             className={cx(
                    //                 styles.blockMessage,
                    //                 styles[
                    //                     stylesBlockRight(
                    //                         messages?.length!,
                    //                         index,
                    //                     )
                    //                 ],
                    //             )}
                    //             data-image
                    //             key={`${item.id}_${item.message}`}
                    //             id={`${item.id!}`}
                    //         >
                    //             <video width={400} height={300} controls>
                    //                 <source
                    //                     src={item.photoUrl!}
                    //                     type="video/mp4"
                    //                 />
                    //             </video>
                    //         </div>
                    //     )
                    // }
                    return null
                })}
            </div>
            {photo ? (
                <Image
                    src={photo!}
                    alt="avatar"
                    width={200}
                    height={200}
                    unoptimized
                />
            ) : (
                <div data-not-avatar />
            )}
        </li>
    )
}

export const ItemMyMessage = memo($ItemMyMessage)
