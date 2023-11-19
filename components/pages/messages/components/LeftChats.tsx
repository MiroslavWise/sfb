"use client"

import { memo, useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import type { IQueryChatList } from "@/types/chat"

import { ItemListChats } from "./ItemListChats"

import {
    queryChatList,
    queryChatListBuyerId,
    queryChatListSellerId,
} from "@/apollo/chat"
import { useAuth } from "@/store/state/useAuth"

const $LeftChats = () => {
    const { user } = useAuth()
    const [isBuyer, setIsBuyer] = useState(false)
    const { data: dataSeller } = useQuery<IQueryChatList>(
        queryChatListSellerId,
        {
            variables: {
                seller_Id: user?.id!,
            },
        },
    )
    const { data: dataBuyer } = useQuery<IQueryChatList>(queryChatListBuyerId, {
        variables: {
            buyer_Id: user?.id!,
        },
    })

    const items = useMemo(() => {
        if (isBuyer && dataBuyer?.chatList) {
            return dataBuyer?.chatList?.results || []
        }
        if (!isBuyer && dataSeller?.chatList) {
            return dataSeller?.chatList?.results || []
        }
        return []
    }, [dataSeller, dataBuyer, isBuyer])

    const length = useMemo(() => {
        if (isBuyer && dataBuyer?.chatList) {
            return dataBuyer?.chatList?.totalCount || 0
        }
        if (!isBuyer && dataSeller?.chatList) {
            return dataSeller?.chatList?.totalCount || 0
        }
        return 0
    }, [dataSeller, dataBuyer, isBuyer])

    return (
        <aside>
            <header>
                <div data-buttons>
                    <button
                        onClick={() => setIsBuyer(false)}
                        data-active={!isBuyer}
                        data-s
                    >
                        <span>Я покупатель</span>
                    </button>
                    <button
                        onClick={() => setIsBuyer(true)}
                        data-active={isBuyer}
                        data-b
                    >
                        <span>Я продавец</span>
                    </button>
                </div>
                <h2>Чаты {length}</h2>
            </header>
            <ul>
                {items.map((item) => (
                    <ItemListChats
                        key={`${item.id}-chats-is-${isBuyer}`}
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    )
}

export const LeftChats = memo($LeftChats)
