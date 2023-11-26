"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@apollo/client"

import type { ICartList } from "@/types/shop"

import { queryCart } from "@/apollo/query-"
import { useFavorites } from "@/store/state/useFavorites"
import { IResponseGeocode } from "@/types/map"
import { useAuth } from "@/store/state/useAuth"

export const NavigateMenuOther = () => {
    const isAuth = useAuth(({ token }) => !!token)
    const favorites = useFavorites(({ favorites }) => favorites)
    const { data: dataCart, refetch: refetchDataCart } =
        useQuery<ICartList>(queryCart)
    const [name, setName] = useState("Aлматы")

    const totalCart = useMemo(() => {
        return dataCart?.cart?.cartItemList?.length || 0
    }, [dataCart?.cart])

    async function do_something(val: number, val2: number) {
        console.log("val: ", val, val2)

        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=14c8303f-9ca6-4d61-98fa-567fe2d1da8d&geocode=${val2},${val}&format=json`,
        )
        const dataResponse: IResponseGeocode = await response.json()

        if (dataResponse) {
            if (
                dataResponse?.response?.GeoObjectCollection?.featureMember[0]
                    ?.GeoObject?.description
            ) {
                setName(
                    dataResponse?.response?.GeoObjectCollection
                        ?.featureMember[0]?.GeoObject?.description,
                )
            }
        }

        console.log("dataResponse: ", dataResponse)
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                do_something(
                    position.coords.latitude,
                    position.coords.longitude,
                )
            })
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            refetchDataCart()
        }
    }, [isAuth])

    return (
        <div data-others>
            <Link href="/market">
                <img src="/svg/sale-02.svg" alt="sale" width={36} height={36} />
                <p>Маркет</p>
            </Link>
            <Link href="/favorites">
                <img src="/svg/tag-01.svg" alt="tag" width={36} height={36} />
                <p>Избранное</p>
                {favorites.length ? (
                    <div data-count>
                        <span>{favorites.length}</span>
                    </div>
                ) : null}
            </Link>
            <Link href="/basket">
                <img
                    src="/svg/shopping-cart-01.svg"
                    alt="cart"
                    width={36}
                    height={36}
                />
                <p>Корзина</p>
                {totalCart ? (
                    <div data-count>
                        <span>{totalCart}</span>
                    </div>
                ) : null}
            </Link>
            <div data-other>
                <img
                    src="/svg/globe-01.svg"
                    alt="globe"
                    width={36}
                    height={36}
                />
                <a data-is-active>RU</a>
                <a data-is-active={false}>KZ</a>
            </div>
            <div data-other>
                <img
                    src="/svg/marker-pin-04.svg"
                    alt="marker"
                    width={36}
                    height={36}
                />
                <a>{name}</a>
            </div>
        </div>
    )
}
