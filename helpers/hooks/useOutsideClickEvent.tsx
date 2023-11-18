import {
    useEffect,
    useState,
    useRef,
    type Dispatch,
    type SetStateAction,
    type RefObject,
    type LegacyRef,
    Ref,
} from "react"

export const useOutsideClickEvent = (): [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    (
        | RefObject<HTMLDivElement | HTMLFormElement | any>
        | LegacyRef<HTMLDivElement | HTMLFormElement | any>
        | Ref<HTMLDivElement | HTMLFormElement | any>
        | Ref<HTMLDivElement>
        | undefined
        | any
    ),
] => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener("click", handleClickOutside)

        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    return [isOpen, setIsOpen, dropdownRef]
}
