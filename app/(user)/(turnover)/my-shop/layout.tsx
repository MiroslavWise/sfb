"use client"

import type { IChildrenProps } from "@/types/types"

import { useTitle } from "@/helpers/hooks/useTitle"
import { useAuth } from "@/store/state/useAuth"
import { useEffect } from "react"
import { usePush } from "@/helpers/hooks/usePush"

export default function Layout({ children }: IChildrenProps) {
    useTitle("Магазины")
    const { handlePush } = usePush()
    const { isCommercial } = useAuth((_) => ({
        isCommercial: _.user?.isCommercial,
    }))

    useEffect(() => {
        if (typeof isCommercial !== "undefined" && !isCommercial) {
            handlePush("/my-products")
        }
    }, [isCommercial])

    if (!isCommercial) return null

    return children
}
