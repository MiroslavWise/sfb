"use client"

import { memo, useMemo } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import type { TItemHeaderCurrentMyProposals } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"

const $ItemHeaderCurrentMyProposals: TItemHeaderCurrentMyProposals = ({
    value,
    label,
}) => {
    const { handleReplace, handlePush } = usePush()
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
    function edit() {
        handlePush(`/my-products/change?product-id=${value}`)
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
            {active ? (
                <Image
                    data-replace
                    src="/svg/replace.svg"
                    alt="replace"
                    width={20}
                    height={20}
                    onClick={(event) => {
                        event.stopPropagation()
                        event.preventDefault()
                        edit()
                    }}
                />
            ) : (
                <Image
                    src="/svg/current.svg"
                    alt="replace"
                    width={20}
                    height={20}
                />
            )}
        </li>
    )
}

export const ItemHeaderCurrentMyProposals = memo($ItemHeaderCurrentMyProposals)
