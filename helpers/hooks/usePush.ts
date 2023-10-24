"use client"

import { useRouter, usePathname } from "next/navigation"

import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

export const usePush = () => {
    const { push, replace } = useRouter()
    const pathname = usePathname()
    const { setIsAnimated } = useAnimateLoadPage()

    function handleReplace(value: string) {
        replace(value)
    }

    function handlePush(value: string) {
        if (pathname !== value) {
            setIsAnimated(true)
        }
        push(value)
    }

    return { handlePush, handleReplace }
}
