import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Безопастность",
    description: "Условия и информация о безопастности нашей платформы",
}

export default function LayoutSafety({ children }: IChildrenProps) {
    return children
}
