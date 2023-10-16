"use client"

import { usePush } from "@/helpers/hooks/usePush"
import { useAuth } from "@/store/state/useAuth"

export const ButtonOut = () => {
    const { handlePush } = usePush()
    const { out } = useAuth()

    function handle() {
        out()
        handlePush("/")
    }

    return (
        <button onClick={handle}>
            <span>Выход</span>
        </button>
    )
}
