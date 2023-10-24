import { useRouter, usePathname } from "next/navigation"

import { useAnimateLoadPage } from "@/store/state/useAnimateLoadPage"

export const usePush = () => {
    const { push, replace } = useRouter()
    const pathname = usePathname()
    const setIsAnimated = useAnimateLoadPage((state) => state.setIsAnimated)

    function handleReplace(value: string) {
        replace(value, { scroll: false })
    }

    function handlePush(value: string) {
        if (pathname !== value) {
            setIsAnimated(true)
        }
        push(value, { scroll: false })
    }

    return { handlePush, handleReplace }
}
