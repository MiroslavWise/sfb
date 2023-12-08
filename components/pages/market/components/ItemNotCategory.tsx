import Link from "next/link"
import Image from "next/image"

import type { ICategoriesChildren } from "@/types/types"

export const ItemNotCategory = (props: ICategoriesChildren) => {
    const { name, id, photoUrl } = props ?? {}

    return (
        <Link
            href={{
                query: {
                    ["category-id"]: id,
                },
            }}
        >
            <Image src={photoUrl ? photoUrl : "/png/catalog/auto.png"} alt="auto" width={300} height={200} unoptimized />
            <p>{name}</p>
        </Link>
    )
}
