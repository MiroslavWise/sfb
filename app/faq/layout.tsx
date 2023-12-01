import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - FAQ",
    description: "Помощь, вопросы и ответы на то, как работает данная платформа",
}

export default function LayoutFAQ({ children }: IChildrenProps) {
    return children
}
