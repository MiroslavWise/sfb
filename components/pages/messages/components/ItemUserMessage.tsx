"use client"

import { memo, useMemo } from "react"
import Image from "next/image"

import { type TTypeMessage } from "@/types/chat"
import type { TItemMessage } from "../types/types"
import { type INewMessage } from "@/helpers/hooks/useJoinMessage"

import { cx } from "@/helpers/lib/cx"
import { stylesBlockRight } from "@/helpers/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/helpers/lib/timeNowOrBefore"

import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"

import styles from "../styles/item-message.module.scss"
import { IPhotoCarousel } from "@/store/types/createVisiblePhotosCarousel"

const $ItemUserMessage: TItemMessage = ({ photo, messages }) => {
    const { dispatchPhotos } = useVisiblePhotos()

    const newMessages: (INewMessage & {
        dataImages?: {
            id: string
            type: TTypeMessage
            url: string
        }[]
    })[] = useMemo(() => {
        const array: (INewMessage & {
            dataImages?: {
                id: string
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
                                id: item.id,
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
                                id: item.id,
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

    return (
        <li className={styles.containerItemUserMessage}>
            {photo ? (
                <Image
                    src={photo!}
                    alt="avatar"
                    width={250}
                    height={250}
                    unoptimized
                />
            ) : (
                <div data-not-avatar />
            )}
            <div className={styles.messages}>
                {newMessages?.map((item, index) => {
                    if (item.type === "TEXT") {
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
                                    {timeNowOrBeforeChat(item?.time!)}
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
                                onClick={() => {
                                    const photos: IPhotoCarousel[] =
                                        item.dataImages!?.map(
                                            (item, index) => ({
                                                id: item.id!,
                                                url: item.url!,
                                                index: index,
                                            }),
                                        )
                                    dispatchPhotos({
                                        visible: true,
                                        current: {
                                            id: item.id!,
                                        },
                                        photos: photos || [],
                                    })
                                }}
                                data-images-block
                                key={`${item.id}_${item.message}`}
                                id={`${item.id!}`}
                            >
                                {item.dataImages?.map((item_) => {
                                    if (item_.type === "IMAGE") {
                                        return (
                                            <Image
                                                src={item_.url!}
                                                alt="photo"
                                                width={250}
                                                height={250}
                                                unoptimized
                                            />
                                        )
                                    }
                                    if (item_.type === "VIDEO") {
                                        return (
                                            <video
                                                width={400}
                                                height={300}
                                                controls
                                            >
                                                <source
                                                    src={item_.url}
                                                    type="video/mp4"
                                                />
                                            </video>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        )
                    }
                    if (item.type === "IMAGE") {
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
                                data-image
                                key={`${item.id}_${item.message}`}
                                id={`${item.id!}`}
                            >
                                <Image
                                    src={item?.photoUrl!}
                                    alt="photo"
                                    width={250}
                                    height={250}
                                    unoptimized
                                />
                            </div>
                        )
                    }
                    return null
                })}
            </div>
        </li>
    )
}

export const ItemUserMessage = memo($ItemUserMessage)
