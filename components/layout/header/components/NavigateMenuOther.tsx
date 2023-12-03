"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"

import type { ICartList } from "@/types/shop"

import { queryCart } from "@/apollo/query-"
import { useAuth } from "@/store/state/useAuth"
import { IResponseGeocode } from "@/types/map"
import { useFavorites } from "@/store/state/useFavorites"

export const Svg = ({ pathD }: { pathD: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g id="--123--">
            <path id="Icon" d={pathD} stroke="#002f34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
)

export const NavigateMenuOther = () => {
    const isAuth = useAuth(({ token }) => !!token)
    const favorites = useFavorites(({ favorites }) => favorites)
    const { data: dataCart, refetch: refetchDataCart } = useQuery<ICartList>(queryCart)
    const [name, setName] = useState("Астана")

    const totalCart = dataCart?.cart?.cartItemList?.length || 0

    async function do_something(val: number, val2: number) {
        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=14c8303f-9ca6-4d61-98fa-567fe2d1da8d&geocode=${val2},${val}&format=json`,
        )
        const dataResponse: IResponseGeocode = await response.json()

        if (dataResponse) {
            if (dataResponse?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.description) {
                setName(dataResponse?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.description)
            }
        }
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                do_something(position.coords.latitude, position.coords.longitude)
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
                <div data-svg>
                    <Svg pathD="M9 9H9.01M15 15H15.01M16 8L8 16M7.33377 3.8187C8.1376 3.75455 8.90071 3.43846 9.51447 2.91542C10.9467 1.69486 13.0533 1.69486 14.4855 2.91542C15.0993 3.43846 15.8624 3.75455 16.6662 3.8187C18.5421 3.96839 20.0316 5.45794 20.1813 7.33377C20.2455 8.1376 20.5615 8.90071 21.0846 9.51447C22.3051 10.9467 22.3051 13.0533 21.0846 14.4855C20.5615 15.0993 20.2455 15.8624 20.1813 16.6662C20.0316 18.5421 18.5421 20.0316 16.6662 20.1813C15.8624 20.2455 15.0993 20.5615 14.4855 21.0846C13.0533 22.3051 10.9467 22.3051 9.51447 21.0846C8.90071 20.5615 8.1376 20.2455 7.33377 20.1813C5.45794 20.0316 3.96839 18.5421 3.8187 16.6662C3.75455 15.8624 3.43846 15.0993 2.91542 14.4855C1.69486 13.0533 1.69486 10.9467 2.91542 9.51447C3.43846 8.90071 3.75455 8.1376 3.8187 7.33377C3.96839 5.45794 5.45794 3.96839 7.33377 3.8187ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9ZM15.5 15C15.5 15.2761 15.2761 15.5 15 15.5C14.7239 15.5 14.5 15.2761 14.5 15C14.5 14.7239 14.7239 14.5 15 14.5C15.2761 14.5 15.5 14.7239 15.5 15Z" />
                </div>
                <p>Маркет</p>
            </Link>
            <Link href="/favorites">
                <div data-svg>
                    <Svg pathD="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z" />
                </div>
                <p>Избранное</p>
                {favorites.length ? (
                    <div data-count>
                        <span>{favorites.length}</span>
                    </div>
                ) : null}
            </Link>
            <Link href="/basket">
                <div data-svg>
                    <Svg pathD="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z" />
                </div>
                <p>Корзина</p>
                {totalCart ? (
                    <div data-count>
                        <span>{totalCart}</span>
                    </div>
                ) : null}
            </Link>
            <div data-other>
                <div data-svg>
                    <Svg pathD="M2 12H22M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" />
                </div>
                <a data-is-active>RU</a>
                <a data-is-active={false}>KZ</a>
            </div>
            <div data-other>
                <div data-svg>
                    <Svg pathD="M5 14.2864C3.14864 15.1031 2 16.2412 2 17.5C2 19.9853 6.47715 22 12 22C17.5228 22 22 19.9853 22 17.5C22 16.2412 20.8514 15.1031 19 14.2864M18 8C18 12.0637 13.5 14 12 17C10.5 14 6 12.0637 6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z" />
                </div>
                <a>{name}</a>
            </div>
        </div>
    )
}
