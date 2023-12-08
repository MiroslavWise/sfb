import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Маркет",
}

export default function LayoutMarket({ children }: IChildrenProps) {
    return children
}
