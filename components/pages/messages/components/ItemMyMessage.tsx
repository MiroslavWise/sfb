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
                {messages?.map((item, index) => (
                    <div
                        className={cx(
                            styles.blockMessage,
                            styles[stylesBlockRight(messages?.length!, index)],
                        )}
                        key={`${item.id}_${item.message}`}
                        id={`${item.id!}`}
                    >
                        <p>{item.message}</p>
                        <p className={styles.time}>
                            {timeNowOrBeforeChat(item?.time)}
                        </p>
                    </div>
                ))}
            </div>
            <Image
                src={photo!}
                alt="avatar"
                className={styles.avatar}
                width={200}
                height={200}
            />
        </li>
    )
}

export const ItemMyMessage = memo($ItemMyMessage)
