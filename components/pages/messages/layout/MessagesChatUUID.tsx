"use client"

import { memo, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"

import type { IDataUser } from "../types/types"
import type { IQueryChatMessageByChatId } from "@/types/chat"

import { ListMessages } from "../components/ListMessages"

import { useAuth } from "@/store/state/useAuth"
import { queryChatMessageByChatId } from "@/apollo/chat"
import { mutateChatMessageCreate } from "@/apollo/mutation"

import styles from "../styles/chat-uuid.module.scss"

const $MessagesChatUUID = ({ id }: { id: string }) => {
    const { user } = useAuth()
    const { id: userId } = user ?? {}
    const { reset, watch, register, handleSubmit } = useForm<IValues>({})
    const [loading, setLoading] = useState(false)
    const [createMessage] = useMutation(mutateChatMessageCreate)
    const [dataUser, setDataUser] = useState<IDataUser>({
        id: null,
        photo: null,
        fullName: null,
    })
    const { data, refetch } = useQuery<IQueryChatMessageByChatId>(
        queryChatMessageByChatId,
        {
            variables: {
                chatId: id,
            },
        },
    )

    function submit(values: IValues) {
        if (!loading) {
            setLoading(true)
            createMessage({
                variables: {
                    chatId: id!,
                    text: values?.text!,
                },
            })
                .then((response) => {
                    console.log("response message: ", response?.data)
                })
                .finally(() => {
                    setLoading(false)
                    reset()
                    refetch()
                })
        }
    }

    useEffect(() => {
        if (data?.chatMessageByChatId && userId) {
            const user = data?.chatMessageByChatId?.results?.find(
                (item) => item?.author?.id !== userId,
            )?.author
            if (user) {
                setDataUser({
                    id: user?.id,
                    fullName: user?.fullName,
                    photo: user?.photo,
                })
            }
        }
    }, [data?.chatMessageByChatId, userId])

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
