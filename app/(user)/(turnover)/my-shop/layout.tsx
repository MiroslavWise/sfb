"use client"

import type { IChildrenProps } from "@/types/types"

import { useTitle } from "@/helpers/hooks/useTitle"

export default function Layout({ children }: IChildrenProps) {
    useTitle("Магазины")

    return children
}
