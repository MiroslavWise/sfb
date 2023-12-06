"use client"

import Link from "next/link"
import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { TABS_SHOP_DETAIL } from "../constants/tabs"

export const NavigationLayout = ({ shopId }: { shopId: string }) => {
    const pathname = usePathname()

    const path = useMemo(() => pathname.split(`${shopId}/`).at(-1), [shopId, pathname])

    return (
        <nav>
            {TABS_SHOP_DETAIL.map((item) => (
                <Link
                    href={{
                        pathname: `/my-shop/${shopId}/${item.value}`,
                    }}
                    data-active={path === item.value}
                >
                    <img src={item.icon} alt={item.value} width={18} height={18} />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    )
}
