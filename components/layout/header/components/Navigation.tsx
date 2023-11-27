"use client"

// import { useTranslation } from "react-i18next"

import { ProfilePanel } from "./ProfilePanel"
import { ButtonLogin } from "./ButtonLogin"
import { useAuth } from "@/store/state/useAuth"

export const Navigation = () => {
    // const { i18n } = useTranslation()
    const state = useAuth(({ state }) => state)

    // const lang = useMemo(() => {
    //     if (i18n.language === "ru") return "Рус"
    //     if (i18n.language === "kz") return "Каз"
    //     return null
    // }, [i18n.language])

    return (
        <ul>
            {state === "Main" ? <ProfilePanel /> : null}
            <ButtonLogin />
        </ul>
    )
}
