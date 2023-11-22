"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, memo, useEffect, useMemo, useState } from "react"

import type { IDataUser } from "../types/types"
import type { IQueryCatId, IQueryChatMessageByChatId } from "@/types/chat"

import { ListMessages } from "../components/ListMessages"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { useSocket } from "@/context/WebSocketContext"
import { mutateChatMessageCreate } from "@/apollo/mutation"
import { useVisiblePhotos } from "@/store/state/useVisiblePhotos"
import { queryChatById, queryChatMessageByChatId } from "@/apollo/chat"
import { ITypeInterfaceUpload, uploadFile } from "@/helpers/services/fetch"

import styles from "../styles/chat-uuid.module.scss"
import { IPhotoCarousel } from "@/store/types/createVisiblePhotosCarousel"
import { useTitle } from "@/helpers/hooks/useTitle"

const $MessagesChatUUID = () => {
    const id = useSearchParams().get("chat-id")
    const { user } = useAuth()
    const { readyState, getWebSocket } = useSocket()
    const { id: userId } = user ?? {}
    const { handlePush } = usePush()
    const { reset, register, handleSubmit } = useForm<IValues>({})
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [stringsFileImg, setStringsFileImg] = useState<string[]>([])
    const [createMessage] = useMutation(mutateChatMessageCreate)
    const { dispatchPhotos } = useVisiblePhotos()
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
        console.log("%c files:", "color: #ff0", files)
        async function create() {
            return createMessage({
                variables: {
                    chatId: id!,
                    text: values?.text!,
                },
            })
                .then((response) => {})
                .finally(() => {
                    setFiles([])
                    setStringsFileImg([])
                    setLoading(false)
                    reset()
                    refetch()
                })
        }
        if (!loading) {
            if (files.length) {
                setLoading(true)
                Promise.all([
                    ...files.map((item, index) => {
                        const dataFile: ITypeInterfaceUpload = {
                            type: "chat/photo-upload/",
                            id: id!,
                            idType: "chat_id",
                        }

                        if (stringsFileImg[index]?.includes("image")) {
                            dataFile.message_type = "IMAGE"
                        }

                        if (stringsFileImg[index]?.includes("video")) {
                            dataFile.message_type = "VIDEO"
                        }
                        return uploadFile(item!, dataFile)
                    }),
                ]).then((response) => {
                    setFiles([])
                    setStringsFileImg([])
                    setLoading(false)
                    reset()
                    refetch()
                    console.log("%c response files: ", "color: #f0f", response)
                })
            } else {
                setLoading(true)
                create()
            }
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
        setValue(index)
    }

    const onSubmit = handleSubmit(submit)

    function handleInfo() {
        if (userId && dataChatInfo) {
            const chat = dataChatInfo?.chatById
            if (chat?.buyer?.id !== userId) {
                handlePush(`/more-details?product-id=${chat?.product?.id}`)
            } else {
                handlePush(
                    `/proposals?proposal-id=${chat?.product?.id}:${chat?.productRequest?.id}`,
                )
            }
        }
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files?.length) {
            for (let i = 0; i < 7; i++) {
                if (files[i]) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        setStringsFileImg((prev) => {
                            if (prev.length >= 7) {
                                return [
                                    ...prev.slice(1, 7),
                                    reader.result as string,
                                ]
                            }
                            return [...prev, reader.result as string]
                        })
                    }
                    reader.readAsDataURL(files[i])
                    setFiles((prev) => {
                        if (prev.length >= 7) {
                            return [...prev.slice(1, 7), files[i]]
                        }
                        return [...prev, files[i]]
                    })
                }
            }
        }
    }

    useTitle(`Чат ${infoCommodity?.name}`)

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
                        <h1>
                            {`${
                                Number(infoCommodity?.price)?.toFixed(0) || 0
                            } ₸` || "Договорная"}{" "}
                        </h1>
                    </div>
                    <div data-buttons>
                        <button data-completed>
                            <span>
                                {dataChatInfo?.chatById?.buyer?.id === userId
                                    ? "Оплатить товар"
                                    : "Сделка заключена"}
                            </span>
                        </button>
                        <button data-path onClick={handleInfo}>
                            <span>Перейти</span>
                            <Image
                                src="/svg/share-06.svg"
                                alt="share"
                                width={18}
                                height={18}
                            />
                        </button>
                    </div>
                </motion.header>
            ) : null}
            <ListMessages
                messages={data?.chatMessageByChatId?.results || []}
                dataUser={dataUser}
            />
            <form onSubmit={onSubmit}>
                {stringsFileImg.length ? (
                    <ul data-files>
                        {stringsFileImg.map((item, index) => (
                            <li key={`${item.slice(0, 100)}-${index}`}>
                                {item.includes("image") ? (
                                    <Image
                                        src={item}
                                        alt="photo"
                                        width={48}
                                        height={48}
                                        unoptimized
                                    />
                                ) : item.includes("video") ? (
                                    <video width={400} height={300} controls>
                                        <source src={item} type="video/mp4" />
                                    </video>
                                ) : null}
                                <div data-preview-delete>
                                    <Image
                                        onClick={() => {
                                            const photos: IPhotoCarousel[] =
                                                stringsFileImg
                                                    .filter((item) =>
                                                        item.includes("image"),
                                                    )
                                                    .map((item, index) => ({
                                                        id: `${index}`,
                                                        index: index,
                                                        url: item,
                                                    }))
                                            dispatchPhotos({
                                                visible: true,
                                                photos: photos,
                                                current: {
                                                    id:
                                                        photos.find(
                                                            (item_) =>
                                                                item_.url.slice(
                                                                    0,
                                                                    125,
                                                                ) ===
                                                                item.slice(
                                                                    0,
                                                                    125,
                                                                ),
                                                        )?.id! ||
                                                        photos[0]?.id!,
                                                },
                                            })
                                        }}
                                        src="/svg/expand-06.svg"
                                        alt="expand"
                                        width={20}
                                        height={20}
                                        data-expand
                                    />
                                    <Image
                                        onClick={() => {
                                            setFiles((prev) =>
                                                prev.filter(
                                                    (_, index_) =>
                                                        index_ !== index,
                                                ),
                                            )
                                            setStringsFileImg((prev) =>
                                                prev.filter(
                                                    (_, index_) =>
                                                        index_ !== index,
                                                ),
                                            )
                                        }}
                                        src="/svg/profile/trash-03.svg"
                                        alt="trash"
                                        width={20}
                                        height={20}
                                        data-expand
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null}
                <textarea
                    placeholder="Введите сообщение... (минимум 2 символа)"
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    maxLength={512}
                    disabled={!!files.length}
                    {...register("text", {
                        required: !files.length,
                        minLength: 2,
                    })}
                />
                <div data-file>
                    <input
                        type="file"
                        disabled={loading}
                        multiple
                        maxLength={5}
                        {...register("files", { required: false })}
                        onChange={handleImageChange}
                    />
                    <Image
                        src="/svg/paperclip.svg"
                        alt="send"
                        width={16}
                        height={16}
                    />
                </div>
                <button type="submit" data-send>
                    <span>Отправить</span>
                    <Image
                        src="/svg/send-01.svg"
                        alt="send"
                        width={16}
                        height={16}
                    />
                </button>
            </form>
        </article>
    )
}

export const MessagesChatUUID = memo($MessagesChatUUID)

export interface IValues {
    text: string
    files: File[]
}
