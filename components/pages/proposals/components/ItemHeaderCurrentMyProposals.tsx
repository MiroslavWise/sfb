"use client"

import { useSearchParams } from "next/navigation"
import { TItemHeaderCurrentMyProposals } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { useMemo } from "react"

export const ItemHeaderCurrentMyProposals: TItemHeaderCurrentMyProposals =
    () => {
        const { handleReplace } = usePush()
        const productId = useSearchParams()?.get("product-id")

        const active = useMemo(() => {
            return !!productId
        }, [productId])

        return <li data-active={active}>
            
        </li>
    }
