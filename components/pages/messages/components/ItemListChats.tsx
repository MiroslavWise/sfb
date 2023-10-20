"use client"

import { memo, useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { IChatItem } from "@/types/chat"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import Image from "next/image"
import dayjs from "dayjs"

const $ItemListChats = (props: IChatItem) => {
    const { user } = useAuth()
    const { id, buyer, seller, product, productRequest, updatedAt } =
        props ?? {}

    const { handleReplace } = usePush()
    const { id: userId } = user ?? {}
    const chatId = useSearchParams().get("chat-id")

    const interlocutor = useMemo(() => {
        if (userId && seller && buyer) {
            if (buyer?.id! === userId!) {
                return seller
            } else {
                return buyer
            }
        } else {
            return null
        }
    }, [buyer, seller, userId])

    const commodity = useMemo(() => {
        if (userId && seller && buyer) {
            if (buyer?.id! === userId!) {
                return productRequest
            } else {
                return product
            }
        } else {
            return null
        }
    }, [buyer, seller, userId])

    return (
        <li
            onClick={() => {
                handleReplace(`/messages?chat-id=${id}`)
            }}
            // data-last={index !== items.length - 1}
            data-last
            data-active={id === chatId}
        >
            {updatedAt ? (
                <sup>{dayjs(updatedAt).format("HH:mm DD.MM.YYYY")}</sup>
            ) : null}
            <header>
                {interlocutor?.photo ? (
                    <Image
                        src={interlocutor?.photo!}
                        alt="avatar"
                        width={250}
                        height={250}
                        unoptimized
                    />
                ) : (
                    <div data-null-image />
                )}
                <div data-name-commodity>
                    <h4>{interlocutor?.fullName || "---{}---"}</h4>
                    <span>
                        <Image
                            src="/svg/switch-horizontal-02.svg"
                            alt="switch-horizontal-02"
                            width={12}
                            height={12}
                        />
                        <i>{commodity?.name}</i>
                    </span>
                </div>
            </header>
        </li>
    )
}

export const ItemListChats = memo($ItemListChats)
