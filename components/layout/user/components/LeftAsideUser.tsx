"use client"

import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import type { IQueryTotalCountProfileAside } from "@/types/total"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"
import { queryTotalCountProfileAside } from "@/apollo/query"
import { ITEMS_ASIDE_LEFT_PICTURE } from "../constants/ITEMS-ASIDE-LEFT"

import { myImageLoader } from "@/helpers/lib/loading"

export function LeftAsideUser() {
    const pathname = usePathname()
    const { isCommercial } = useAuth((_) => ({
        isCommercial: _.user?.isCommercial,
    }))
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
                    isCommercial: isCommercial, //---------------------------------------------------------------------------
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
                        </div>
                        {item.count ? (
                            <div data-count>
                                <span>{item.count}</span>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
        </aside>
    )
}
