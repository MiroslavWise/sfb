"use client"

import { usePush } from "@/helpers/hooks/usePush"
import { useId } from "react"

export const LeftChats = () => {
    const id = useId()
    const { handlePush } = usePush()

    return (
        <aside>
            <header>
                <h2>Сообщения</h2>
            </header>
            <ul>
                <li
                    onClick={() => {
                        handlePush(`/messages?id-chat=${id}`)
                    }}
                >
                    <div>
                        <div data-header></div>
                    </div>
                </li>
            </ul>
        </aside>
    )
}
