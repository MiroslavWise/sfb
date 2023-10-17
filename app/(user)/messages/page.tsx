"use client"

import { useSearchParams } from "next/navigation"

import styles from "./page.module.scss"

export default function Messages() {
    const id = useSearchParams().get("chat-id")

    return <div></div>
}
