"use client"

import { useSearchParams } from "next/navigation"
import { TItemHeaderCurrentMyProposals } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { MouseEventHandler, useMemo } from "react"
import Image from "next/image"

export const ItemHeaderCurrentMyProposals: TItemHeaderCurrentMyProposals = ({
    value,
    label,
}) => {
    const { handleReplace, handlePush } = usePush()
    const productId = useSearchParams()?.get("product-id")

    const active = useMemo(() => {
        return productId === value
    }, [productId])

    function handle() {
        handleReplace(`/proposals?product-id=${value}`)
    }
    function edit() {
        handlePush(`/proposals/${value}/change`)
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
