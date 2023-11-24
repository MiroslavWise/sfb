import { useRouter, usePathname } from "next/navigation"

import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

export const usePush = () => {
    const { push, replace, back: back_ } = useRouter()
    const pathname = usePathname()
    const setIsAnimated = useAnimateLoadPage((state) => state.setIsAnimated)

    function handleReplace(value: string) {
        replace(value, { scroll: true })
    }

    function handlePush(value: string) {
        if (!pathname.includes(value)) {
            setIsAnimated(true)
        }
        push(value, { scroll: true })
    }

    function back() {
        back_()
    }

    return { handlePush, handleReplace, back }
}
