"use client"

import { memo, useMemo } from "react"
import { useQuery } from "@apollo/client"

import type { IQueryChatList } from "@/types/chat"

import { ItemListChats } from "./ItemListChats"

import { queryChatList } from "@/apollo/chat"

const $LeftChats = () => {
    const { data } = useQuery<IQueryChatList>(queryChatList)

    const items = useMemo(() => {
        return data?.chatList?.results || []
    }, [data?.chatList?.results])

    const length = useMemo(() => {
        return data?.chatList?.totalCount || 0
    }, [data?.chatList?.results])

    return (
        <aside>
            <header>
                <h2>Чаты {length}</h2>
            </header>
            <ul>
                {items.map((item, index) => (
                    <ItemListChats key={`${item.id}-chats`} {...item} />
                ))}
            </ul>
        </aside>
    )
}

export const LeftChats = memo($LeftChats)
