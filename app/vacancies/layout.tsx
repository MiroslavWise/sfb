import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Вакансии",
    description: "Вакансии нашей компании, а так-же вакансии магазинов, нахлдящихся на нашей платформе",
}

export default function LayoutVacancies({ children }: IChildrenProps) {
    return children
}
