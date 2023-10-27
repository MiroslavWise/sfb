"use client"

import { memo } from "react"
import Image from "next/image"

import type { TItemMessage } from "../types/types"

import { cx } from "@/helpers/lib/cx"
import { stylesBlockRight } from "@/helpers/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/helpers/lib/timeNowOrBefore"

import styles from "../styles/item-message.module.scss"

const $ItemMyMessage: TItemMessage = ({ photo, messages }) => {
    return (
        <li className={cx(styles.containerItemMyMessage)}>
            <div className={styles.messages}>
                {messages?.map((item, index) => {
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
                    if (item.type === "VIDEO") {
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
                                <video width={400} height={300} controls>
                                    <source
                                        src={item.photoUrl!}
                                        type="video/mp4"
                                    />
                        div     </video>
                            </div>
                        )
                    }
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
