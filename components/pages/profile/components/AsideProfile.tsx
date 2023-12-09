"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { resetCaches, resetApolloContext } from "@apollo/client"

import { useAuth } from "@/store/state/useAuth"
import { MENU_PROFILE } from "../constants/menu"
import { usePush } from "@/helpers/hooks/usePush"

export const AsideProfile = () => {
    const pathname = usePathname()
    const { handlePush } = usePush()
    const out = useAuth(({ out }) => out)

    function handle() {
        resetApolloContext()
        resetCaches()
        requestAnimationFrame(() => {
            out()
            handlePush("/")
        })
    }

    return (
        <aside>
            {MENU_PROFILE.map((item) => (
                <Link href={{ pathname: item.path }} data-active={pathname.includes(item.path)}>
                    <img data-icon src={item.icon} alt="--icon--" width={24} height={24} />
                    <span>{item.label}</span>
                    <img data-arrow src="/svg/chevron-right-red.svg" alt="arrow-right" width={24} height={24} />
                </Link>
            ))}
            <button data-out onClick={handle}>
                <p>Выйти</p>
            </button>
        </aside>
    )
}
