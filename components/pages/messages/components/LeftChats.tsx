"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import type { IQueryChatList } from "@/types/chat"

import { ItemListChats } from "./ItemListChats"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { queryChatListBuyerId, queryChatListSellerId } from "@/apollo/chat"
import { useTitle } from "@/helpers/hooks/useTitle"

const $LeftChats = () => {
    const { user } = useAuth()
    const { handleReplace } = usePush()
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
        return {
            buyerCount: dataBuyer?.chatList?.totalCount || 0,
            sellerCount: dataSeller?.chatList?.totalCount || 0,
        }
    }, [dataSeller, dataBuyer, isBuyer])

    useTitle(`Чат (${isBuyer ? length.buyerCount : length.sellerCount})`)

    return (
        <aside>
            <header>
                <div data-buttons>
                    <button
                        onClick={() => {
                            if (isBuyer) {
                                handleReplace("/messages")
                            }
                            setIsBuyer(false)
                        }}
                        data-active={!isBuyer}
                        data-s
                    >
                        <span>Я продавец {length.sellerCount}</span>
                    </button>
                    <button
                        onClick={() => {
                            if (!isBuyer) {
                                handleReplace("/messages")
                            }
                            setIsBuyer(true)
                        }}
                        data-active={isBuyer}
                        data-b
                    >
                        <span>Я покупатель {length.buyerCount}</span>
                    </button>
                </div>
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

export const LeftChats = $LeftChats
