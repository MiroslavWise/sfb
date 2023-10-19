"use client"

import { memo, useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { TItemHeaderCurrentMyProposals } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"

const $ItemHeaderCurrentMyProposals: TItemHeaderCurrentMyProposals = ({
    value,
    label,
}) => {
    const { handleReplace } = usePush()
    const productId = useSearchParams()?.get("request-id")

    const active = useMemo(() => {
        return productId === value
    }, [productId])

    function handle() {
        if (value !== productId) {
            handleReplace(`/proposals?request-id=${value}`)
        } else {
            handleReplace(`/proposals`)
        }
    }

    return (
        <li
            data-active={active}
            onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
                handle()
            }}
        >
            <p>{label}</p>
        </li>
    )
}

export const ItemHeaderCurrentMyProposals = memo($ItemHeaderCurrentMyProposals)
