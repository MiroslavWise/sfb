import { useRouter, usePathname } from "next/navigation"

export const usePush = () => {
    const { push, replace } = useRouter()
    const pathname = usePathname()

    function handleReplace(value: string) {
        replace(value)
    }

    function handlePush(value: string) {
        if (pathname !== value) {
        }
        push(value)
    }

    return { handlePush, handleReplace }
}
