"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { usePathname } from "next/navigation"

import { usePush } from "@/helpers/hooks/usePush"

import { ButtonLogin } from "./ButtonLogin"

export const Navigation = () => {
    const pathname = usePathname()
    const { i18n } = useTranslation()
    const { handlePush } = usePush()

    const lang = useMemo(() => {
        if (i18n.language === "ru") return "Рус"
        if (i18n.language === "kz") return "Каз"
        return null
    }, [i18n.language])

    function handleLanguage() {
        console.log("handleLanguage: ", i18n.language)
        i18n.changeLanguage(i18n.language === "ru" ? "kz" : "ru")
    }

    return (
        <nav>
            <li
                onClick={() => handlePush("/about")}
                data-active={pathname.includes("/about")}
            >
                <a>О компании</a>
            </li>
            <li
                onClick={() => handlePush("/exchange")}
                data-active={pathname.includes("/exchange")}
            >
                <a>Биржа</a>
            </li>
            <li
                onClick={() => handlePush("/faq")}
                data-active={pathname.includes("/faq")}
            >
                <a>FAQ</a>
            </li>
            <li
                onClick={() => handlePush("/contacts")}
                data-active={pathname.includes("/contacts")}
            >
                <a>Контакты</a>
            </li>
            <li data-lang onClick={handleLanguage}>
                <a>{lang}</a>
            </li>
            <ButtonLogin />
        </nav>
    )
}
