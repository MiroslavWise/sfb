"use client"

import { useSearchParams } from "next/navigation"
import { MessagesChatUUID } from "@/components/pages/messages"

export default function Messages() {
    const id = useSearchParams().get("chat-id")

    if (id) return <MessagesChatUUID />
    return <div />
}
