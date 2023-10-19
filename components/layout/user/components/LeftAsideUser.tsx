"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import type { IQueryTotalCountProfileAside } from "@/types/total"

import { ComponentCarouselBannerMainPage } from "@/components/pages/main"

import { usePush } from "@/helpers/hooks/usePush"
import { queryTotalCountProfileAside } from "@/apollo/query"
import { ITEMS_ASIDE_LEFT } from "../constants/ITEMS-ASIDE-LEFT"

export const LeftAsideUser = () => {
    const pathname = usePathname()
    const { handlePush } = usePush()
    const { data } = useQuery<IQueryTotalCountProfileAside>(
        queryTotalCountProfileAside,
    )

    return (
        <aside>
            <ul data-links>
                {ITEMS_ASIDE_LEFT({
                    constMessages: data?.chatList?.totalCount,
                    countMyProducts: data?.productListMe?.totalCount,
                    countMyRequests: data?.productRequestListMe?.totalCount,
                }).map((item) => (
                    <li
                        key={`${item.value}-profile-link`}
                        onClick={() => handlePush(item.value)}
                        data-active={pathname.includes(item.value)}
                    >
                        <Image
                            src={item.icon}
                            alt={item.icon}
                            width={22}
                            height={22}
                        />
                        <p>{item.label}</p>
                        {item.count ? (
                            <div data-count>
                                <span>{item.count}</span>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
            <ComponentCarouselBannerMainPage type="aside" />
        </aside>
    )
}
