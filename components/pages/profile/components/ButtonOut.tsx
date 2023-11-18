"use client"

import { usePush } from "@/helpers/hooks/usePush"
import { useAuth } from "@/store/state/useAuth"

export const ButtonOut = () => {
    const { handlePush } = usePush()
    const { out } = useAuth()

    function handle() {
        handlePush("/")
        out()
    }

    return (
        <button onClick={handle}>
            <span>Выход</span>
        </button>
    )
}
