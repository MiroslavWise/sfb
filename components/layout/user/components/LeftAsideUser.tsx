"use client"

import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import type { IQueryTotalCountProfileAside } from "@/types/total"

import { useAuth } from "@/store/state/useAuth"
import { queryTotalCountProfileAside } from "@/apollo/query"
import { ITEMS_ASIDE_LEFT_PICTURE } from "../constants/ITEMS-ASIDE-LEFT"

export function LeftAsideUser() {
    const pathname = usePathname()
    const user = useAuth(({ user }) => user)
    const { isCommercial } = user ?? {}
    const { data } = useQuery<IQueryTotalCountProfileAside>(queryTotalCountProfileAside)

    return (
        <aside>
            <ul data-links>
                {ITEMS_ASIDE_LEFT_PICTURE({
                    isCommercial: isCommercial,
                    constMessages: data?.chatList?.totalCount,
                    countMyProducts: data?.productListMe?.totalCount,
                    countMyRequests: data?.productRequestListMe?.totalCount,
                }).map((item) => (
                    <Link
                        data-picture
                        key={`${item.value}-profile-link`}
                        href={{ pathname: item.value }}
                        data-active={pathname.includes(item.value)}
                    >
                        <div data-absolute />
                        <Image src={item.icon} alt={item.icon} width={300} height={200} unoptimized />
                        <div data-label>
                            <p>{item.label}</p>
                        </div>
                        {item.count ? (
                            <div data-count>
                                <span>{item.count}</span>
                            </div>
                        ) : null}
                    </Link>
                ))}
            </ul>
        </aside>
    )
}
