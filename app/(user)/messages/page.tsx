"use client"

import { useSearchParams } from "next/navigation"
import { MessagesChatUUID } from "@/components/pages/messages/layout/MessagesChatUUID"

export default function Messages() {
    const id = useSearchParams().get("chat-id")

    if (id) return <MessagesChatUUID id={id} />
    return <div />
}
