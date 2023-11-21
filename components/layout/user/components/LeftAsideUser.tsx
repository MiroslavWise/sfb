"use client"

import { memo } from "react"
import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import type { IQueryTotalCountProfileAside } from "@/types/total"

import { ComponentCarouselBannerMainPage } from "@/components/pages/main"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { queryTotalCountProfileAside } from "@/apollo/query"
import {
    ITEMS_ASIDE_LEFT,
    ITEMS_ASIDE_LEFT_PICTURE,
} from "../constants/ITEMS-ASIDE-LEFT"

const $LeftAsideUser = () => {
    const pathname = usePathname()
    const { user } = useAuth()
    const { handlePush } = usePush()
    const { data } = useQuery<IQueryTotalCountProfileAside>(
        queryTotalCountProfileAside,
        {
            defaultOptions: {},
            fetchPolicy: "cache-first",
            initialFetchPolicy: "cache-first",
        },
    )

    return (
        <aside>
            <ul data-links>
                {ITEMS_ASIDE_LEFT_PICTURE({
                    constMessages: data?.chatList?.totalCount,
                    countMyProducts: data?.productListMe?.totalCount,
                    countMyRequests: data?.productRequestListMe?.totalCount,
                }).map((item) => (
                    <li
                        data-picture
                        key={`${item.value}-profile-link`}
                        onClick={() => handlePush(item.value)}
                        data-active={pathname.includes(item.value)}
                    >
                        <div data-absolute />
                        <Image
                            src={item.icon}
                            alt={item.icon}
                            width={300}
                            height={200}
                            unoptimized
                        />
                        <div data-label-count>
                            <p>{item.label}</p>
                            {item.count ? (
                                <div data-count>
                                    <span>{item.count}</span>
                                </div>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export const LeftAsideUser = memo($LeftAsideUser)
