"use client"

import { memo } from "react"
import { useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"

import type { IQueryChatMessageByChatId } from "@/types/chat"

import { ListMessages } from "../components/ListMessages"

import { queryChatMessageByChatId } from "@/apollo/chat"

import styles from "../styles/chat-uuid.module.scss"

const $MessagesChatUUID = ({ id }: { id: string }) => {
    const { reset, watch, register, handleSubmit } = useForm<IValues>({})

    const { data, loading, refetch } = useQuery<IQueryChatMessageByChatId>(
        queryChatMessageByChatId,
        {
            variables: {
                chatId: id,
            },
        },
    )

    function submit(values: IValues) {
        console.log("values: ", values)
        refetch()
        reset()
    }

    const dataUser = {
        id: "qwe",
        photo: "/png/photo.png",
        fullName: "|.|.|.|.|",
    }

    const onSubmit = handleSubmit(submit)

    return (
        <article className={styles.wrapper}>
            <ListMessages
                messages={data?.chatMessageByChatId?.results || []}
                dataUser={dataUser}
            />
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder="Введите сообщение... (минимум 2 символа)"
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    maxLength={512}
                    {...register("text", { required: true, minLength: 2 })}
                />
                <button type="submit">
                    <span>Отправить</span>
                </button>
            </form>
        </article>
    )
}

export const MessagesChatUUID = memo($MessagesChatUUID)

export interface IValues {
    text: string
}
