"use client"

import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@apollo/client"

import type { IListShop } from "@/types/shop"

import { queryShopList } from "@/apollo/query-"
import { useMemo } from "react"

export const ShopMainPage = () => {
    const { data } = useQuery<IListShop>(queryShopList)

    const list = useMemo(() => data?.shopList?.results || [], [data?.shopList])

    return (
        <ul>
            {list.map((item) => (
                <Link
                    key={`${item.id}-shop-my`}
                    href={{
                        pathname: `/my-shop/${item.id}/`,
                    }}
                >
                    {item.photoUrl ? (
                        <Image src={item.photoUrl} alt="photo" width={380} height={380} unoptimized />
                    ) : (
                        <div data-img>
                            <span>Нет фотографии</span>
                        </div>
                    )}
                    <div data-info>
                        <header>
                            <h3>{item.name}</h3>
                            <h4>{item.description}</h4>
                        </header>
                    </div>
                    <div data-verification>
                        <img
                            src={item?.confirmation ? "/svg/check-verified-03.svg" : "/svg/x-circle-red.svg"}
                            alt="check-verified"
                            width={24}
                            height={24}
                        />
                    </div>
                </Link>
            ))}
        </ul>
    )
}
