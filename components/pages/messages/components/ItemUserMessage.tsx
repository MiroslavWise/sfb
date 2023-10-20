"use client"

import { memo } from "react"
import Image from "next/image"

import type { TItemMessage } from "../types/types"

import { cx } from "@/helpers/lib/cx"
import { stylesBlockRight } from "@/helpers/lib/styles-block-message"
import { timeNowOrBeforeChat } from "@/helpers/lib/timeNowOrBefore"

import styles from "../styles/item-message.module.scss"

const $ItemUserMessage: TItemMessage = ({ photo, messages }) => {
    return (
        <li className={styles.containerItemUserMessage}>
            <Image src={photo!} alt="avatar" width={250} height={250} />
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
                            {timeNowOrBeforeChat(item?.time!)}
                        </p>
                    </div>
                ))}
            </div>
        </li>
    )
}

export const ItemUserMessage = memo($ItemUserMessage)
