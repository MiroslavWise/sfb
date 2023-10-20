"use client"

import { useForm } from "react-hook-form"
import { memo, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"
import { motion } from "framer-motion"

import type { IDataUser } from "../types/types"
import type { IQueryCatId, IQueryChatMessageByChatId } from "@/types/chat"

import { ListMessages } from "../components/ListMessages"

import { useAuth } from "@/store/state/useAuth"
import { useSocket } from "@/context/WebSocketContext"
import { queryChatById, queryChatMessageByChatId } from "@/apollo/chat"
import { mutateChatMessageCreate } from "@/apollo/mutation"

import styles from "../styles/chat-uuid.module.scss"
import Image from "next/image"

const $MessagesChatUUID = () => {
    const id = useSearchParams().get("chat-id")
    const { user } = useAuth()
    const { readyState, getWebSocket } = useSocket()
    const { id: userId } = user ?? {}
    const { reset, register, handleSubmit } = useForm<IValues>({})
    const [loading, setLoading] = useState(false)
    const [createMessage] = useMutation(mutateChatMessageCreate)
    const [dataUser, setDataUser] = useState<IDataUser>({
        id: null,
        photo: null,
        fullName: null,
    })
    const { data: dataChatInfo } = useQuery<IQueryCatId>(queryChatById, {
        variables: {
            chatId: id,
        },
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
                .then((response) => {})
                .finally(() => {
                    setLoading(false)
                    reset()
                    refetch()
                })
        }
    }

    useEffect(() => {
        if (dataChatInfo?.chatById && userId) {
            if (dataChatInfo?.chatById?.buyer?.id === userId) {
                const user = dataChatInfo?.chatById?.seller
                setDataUser({
                    id: user?.id,
                    fullName: user?.fullName,
                    photo: user?.photo,
                })
                return
            } else {
                const user = dataChatInfo?.chatById?.buyer
                setDataUser({
                    id: user?.id,
                    fullName: user?.fullName,
                    photo: user?.photo,
                })
                return
            }
        }
    }, [dataChatInfo, userId])
    useEffect(() => {
        const messageListener = (event: any) => {
            const data = JSON.parse(event?.data)
            console.log("data: ", data)
            if (
                data?.data?.type === "new_message" &&
                data?.data?.chat_id === id &&
                data?.data?.sender?.id !== userId
            ) {
                refetch()
            }
        }
        if (readyState === 1 && id && userId) {
            getWebSocket()?.addEventListener("message", messageListener)

            return () => {
                getWebSocket()?.removeEventListener("message", messageListener)
            }
        }
    }, [readyState, userId])

    const infoCommodity = useMemo(() => {
        const chat = dataChatInfo?.chatById

        if (chat && userId) {
            if (chat?.buyer?.id === userId) {
                return chat?.product
            } else {
                return chat?.productRequest
            }
        }
    }, [dataChatInfo?.chatById, userId])
    const [value, setValue] = useState(0)

    function handleValue(index: number) {
        console.log("data-active: ", index)
        setValue(index)
    }

    const onSubmit = handleSubmit(submit)

    return (
        <article className={styles.wrapper}>
            {infoCommodity ? (
                <motion.header
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.3 }}
                >
                    {infoCommodity?.photoListUrl?.length ? (
                        <div data-photos>
                            {infoCommodity?.photoListUrl
                                ?.slice(0, 4)
                                ?.map((item, index) => (
                                    <Image
                                        data-active={value === index}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            event.preventDefault()
                                            handleValue(index)
                                        }}
                                        key={`${item.id}-phtoosasf---`}
                                        src={item.photoUrl!}
                                        alt="---"
                                        width={150}
                                        height={150}
                                        unoptimized
                                    />
                                ))}
                        </div>
                    ) : null}
                    <div data-info>
                        <h2>{infoCommodity?.name}</h2>
                        <h1>{`${infoCommodity?.price} ₸` || "Договорная"} </h1>
                    </div>
                    <button data-path>
                        <span>Перейти</span>
                        <Image
                            src="/svg/share-06.svg"
                            alt="share"
                            width={18}
                            height={18}
                        />
                    </button>
                </motion.header>
            ) : null}
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
