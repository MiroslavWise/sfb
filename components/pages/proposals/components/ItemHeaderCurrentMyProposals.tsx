"use client"

import { useSearchParams } from "next/navigation"
import { TItemHeaderCurrentMyProposals } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { useMemo } from "react"
import Image from "next/image"

export const ItemHeaderCurrentMyProposals: TItemHeaderCurrentMyProposals = ({
    value,
    label,
}) => {
    const { handleReplace } = usePush()
    const productId = useSearchParams()?.get("product-id")

    const active = useMemo(() => {
        return productId === value
    }, [productId])

    function handle() {
        handleReplace(`/proposals?product-id=${value}`)
    }

    return (
        <li data-active={active} onClick={handle}>
            <p>{label}</p>
            {active ? (
                <Image
                    src="/svg/replace.svg"
                    alt="replace"
                    width={20}
                    height={20}
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
