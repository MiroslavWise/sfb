import { type Metadata } from "next"
import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Маркет",
    description: "Каталог не только товаров, а так-же запросов, в которых нуждаются другие люди",
}

export default function LayoutMarket({ children }: IChildrenProps) {
    return children
}
