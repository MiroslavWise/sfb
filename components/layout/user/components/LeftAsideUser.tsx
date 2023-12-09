"use client"

import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@apollo/client"
import { usePathname } from "next/navigation"

import { useAuth } from "@/store/state/useAuth"
import { useOrderingProduct } from "@/store/state/useOrderingProduct"
import { ITEMS_ASIDE_LEFT_PICTURE } from "../constants/ITEMS-ASIDE-LEFT"
import { productRequestListMe, queryProductListMe } from "@/apollo/query"

export function LeftAsideUser() {
    const pathname = usePathname()
    const price = useOrderingProduct(({ price }) => price)
    const user = useAuth(({ user }) => user)
    const { isCommercial } = user ?? {}
    const { data: dataRequestListMe } = useQuery(productRequestListMe, {
        variables: { offset: 0 },
    })
    const { data: dataProductListMe } = useQuery(queryProductListMe, {
        variables: {
            ordering: price,
            offset: 0,
        },
    })

    return (
        <aside>
            <ul data-links>
                {ITEMS_ASIDE_LEFT_PICTURE({
                    isCommercial: isCommercial,
                    countMyProducts: dataProductListMe?.productListMe?.totalCount,
                    countMyRequests: dataRequestListMe?.productRequestListMe?.totalCount,
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
