import { useEffect } from "react"

export const useTitle = (value: string) => {
    useEffect(() => {
        document.title = `SFB - ${value}`

        return () => {
            document.title = "SFB"
        }
    }, [value])
}
