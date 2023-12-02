import { Metadata } from "next"

import { IChildrenProps } from "@/types/types"

export const metadata: Metadata = {
    title: "SFB - Уведомления",
}

export default function MessagesLayout({ children }: IChildrenProps) {
    return children
}
