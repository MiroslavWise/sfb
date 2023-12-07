import Link from "next/link"
import Image from "next/image"

import type { ICategoriesChildren } from "@/types/types"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

export const ItemLinkCategory = ({ id, name, photoUrl, childrenList }: ICategoriesChildren) => {
    const categoryId = useSearchParams().get("category-id")

    const isActive = useMemo(() => {
        if (categoryId === id) return true
        if (childrenList?.some((item) => item.id === categoryId)) return true
        if (childrenList?.some((item) => item.childrenList?.some((item) => item.id === categoryId))) return true

        return false
    }, [categoryId, id])

    return (
        <Link
            key={`${id}-main-category`}
            href={{
                query: {
                    ["category-id"]: id,
                },
            }}
            data-active={isActive}
        >
            <Image src={photoUrl ? photoUrl : "/png/catalog/auto.png"} alt="photo" width={36} height={36} unoptimized />
            <span>{name}</span>
        </Link>
    )
}
