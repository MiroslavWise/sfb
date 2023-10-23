"use client"

import Image from "next/image"

import type { TItemsMainCatalog } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"

export const CardCatalog: TItemsMainCatalog = ({ label, img, value }) => {
    const { handleReplace } = usePush()

    function handle() {
        handleReplace(`/market?product=${value}`)
    }

    return (
        <div data-card onClick={handle}>
            <Image src={img} alt={img} width={200} height={200} unoptimized />
            <p>{label}</p>
        </div>
    )
}
