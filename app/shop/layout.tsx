import type { Metadata } from "next"
import type { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Магазины",
    description: "Магазины",
}

export default function LayoutShop({ children }: IChildrenProps) {
    return children
}
