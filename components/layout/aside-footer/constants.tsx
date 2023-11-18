import Image from "next/image"

import {
    Person,
    BellDot,
    PersonPencil,
    ShieldKeyhole,
    CommentDot,
    ArrowRightFromSquare,
} from "@gravity-ui/icons"
import { ReactNode } from "react"

export const MENU_AUTH: IMenuAuth[] = [
    {
        path: "/my-requests",
        icon: (
            <Image
                src="/png/Menu/med-badr-chemmaoui-ZSPBhokqDMc-unsplash.jpg"
                alt="requests"
                width={160}
                height={160}
            />
        ),
        label: "Мои запросы",
    },
    {
        path: "/my-products",
        icon: (
            <Image
                src="/png/Menu/erwan-hesry-RJjY5Hpnifk-unsplash.jpg"
                alt="products"
                width={160}
                height={160}
            />
        ),
        label: "Мои товары",
    },
    {
        path: "/delivery",
        icon: (
            <Image
                src="/png/Menu/rosebox-BFdSCxmqvYc-unsplash.jpg"
                alt="products"
                width={160}
                height={160}
            />
        ),
        label: "Доставка",
    },
    {
        path: "/my-sales",
        icon: (
            <Image
                src="/png/Menu/nathan-dumlao-lvWw_G8tKsk-unsplash.jpg"
                alt="products"
                width={160}
                height={160}
            />
        ),
        label: "Мои продажи",
    },
    {
        path: "/my-orders",
        icon: (
            <Image
                src="/png/Menu/daniel-bradley-y_WDEY9e6mA-unsplash.jpg"
                alt="products"
                width={160}
                height={160}
            />
        ),
        label: "Мои заказы",
    },

    {
        path: "/notifications",
        icon: <BellDot />,
        label: "Уведомления",
    },
    {
        path: "/messages",
        icon: <CommentDot />,
        label: "Чат",
    },
    {
        path: "/change-data",
        icon: <PersonPencil />,
        label: "Редактировать профиль",
    },
    {
        path: "/change-password",
        icon: <ShieldKeyhole />,
        label: "Изменить пароль",
    },

    {
        path: "/profile",
        icon: <Person />,
        label: "Профиль",
        suffix: <ArrowRightFromSquare />,
    },
]

interface IMenuAuth {
    path: string
    icon: ReactNode
    label: string
    suffix?: ReactNode
}
