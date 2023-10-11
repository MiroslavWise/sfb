"use client"

import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { usePush } from "@/helpers/hooks/usePush"

import { ButtonLogin } from "./ButtonLogin"

export const Navigation = () => {
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
            <a onClick={() => handlePush("/about")}>О компании</a>
            <a onClick={() => handlePush("/exchange")}>Биржа</a>
            <a onClick={() => handlePush("/faq")}>FAQ</a>
            <a onClick={() => handlePush("/contacts")}>Контакты</a>
            {lang ? (
                <a data-lang onClick={handleLanguage}>
                    {lang}
                </a>
            ) : null}
            <ButtonLogin />
        </nav>
    )
}
