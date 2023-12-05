import { useEffect } from "react"

export const useTitle = (value: string | undefined) => {
    useEffect(() => {
        if (value) {
            document.title = `SFB - ${value}`
        }

        return () => {
            document.title = "SFB"
        }
    }, [value])
}
