"use client"

import Image from "next/image"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { usePathname } from "next/navigation"

import { MENU_ITEMS } from "../constants/menu"
import { usePush } from "@/helpers/hooks/usePush"

import { ButtonLogin } from "./ButtonLogin"
import { useAuth } from "@/store/state/useAuth"
import { ProfilePanel } from "./ProfilePanel"

const $Navigation = () => {
    const pathname = usePathname()
    const { i18n } = useTranslation()
    const { handlePush } = usePush()
    const { state } = useAuth()

    const lang = useMemo(() => {
        if (i18n.language === "ru") return "Рус"
        if (i18n.language === "kz") return "Каз"
        return null
    }, [i18n.language])

    // function handleLanguage() {
    //     i18n.changeLanguage(i18n.language === "ru" ? "kz" : "ru")
    // }

    return (
        <nav>
            {MENU_ITEMS.map((item) => (
                <li
                    key={item.value + "-item-menu-"}
                    onClick={() => handlePush(item.value)}
                    data-active={pathname.includes(item.value)}
                >
                    <Image src={item.icon} alt="icon" width={24} height={24} />
                    <a>{item.label}</a>
                </li>
            ))}
            {state === "Main" ? <ProfilePanel /> : null}
            <ButtonLogin />
        </nav>
    )
}

export const Navigation = memo($Navigation)
