import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Контакты",
    description: "Контакты нашей команды, а так-же возможность связаться с нами насчёт платформы",
}

export default function LayoutContacts({ children }: IChildrenProps) {
    return children
}
