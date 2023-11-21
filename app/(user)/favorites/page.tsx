"use client"

import { useSearchParams } from "next/navigation"

import { PageFavorites, PageFavoritesUUID } from "@/components/pages/favorites"

export default function Favorites() {
    const uuid = useSearchParams().get("product-id")

    if (uuid) return <PageFavoritesUUID />
    return <PageFavorites />
}
