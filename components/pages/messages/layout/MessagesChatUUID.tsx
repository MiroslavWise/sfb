"use client"

import { memo } from "react"
import { useForm } from "react-hook-form"

import styles from "../styles/chat-uuid.module.scss"

const $MessagesChatUUID = ({ id }: { id: string }) => {
    const { reset, watch, register, handleSubmit } = useForm<IValues>({})

    function submit(values: IValues) {
        reset()
    }

    const onSubmit = handleSubmit(submit)

    return (
        <article className={styles.wrapper}>
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder="Введите сообщение..."
                    onKeyDown={(event) => {
                        if (event.keyCode === 13 || event.code === "Enter") {
                            onSubmit()
                        }
                    }}
                    maxLength={512}
                    {...register("text", { required: true })}
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
