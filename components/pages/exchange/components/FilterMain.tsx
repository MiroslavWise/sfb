"use client"

import { useState } from "react"
import Image from "next/image"

import type { IFilterMain } from "../types/types"

export const FilterMain = ({ label }: IFilterMain) => {
    const [active, setActive] = useState(false)

    function handle() {
        setActive((prev) => !prev)
    }

    return (
        <div data-filter onClick={handle}>
            <p>{label}</p>
            <Image
                data-active={active}
                src="/svg/chevron-down-primary.svg"
                alt="chevron-down-primary"
                width={24}
                height={24}
            />
        </div>
    )
}
