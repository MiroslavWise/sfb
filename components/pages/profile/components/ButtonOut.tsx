"use client"

import { resetCaches, resetApolloContext } from "@apollo/client"
import { usePush } from "@/helpers/hooks/usePush"
import { useAuth } from "@/store/state/useAuth"

export const ButtonOut = () => {
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
        <button onClick={handle}>
            <span>Выход</span>
        </button>
    )
}
