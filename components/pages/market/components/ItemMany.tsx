import { useMemo } from "react"
import Image from "next/image"

import type { TItemMany } from "../types/types"

import { useSearchParams } from "next/navigation"

import styles from "../styles/catalog-many.module.scss"
import Link from "next/link"

export const ItemMany: TItemMany = ({ id, name, photoUrl, childrenList }) => {
    const categoryId = useSearchParams().get("category-id")

    const isActive = useMemo(() => {
        if (categoryId === id) return true
        if (childrenList?.some((item) => item.id === categoryId)) return true
        if (childrenList?.some((item) => item.childrenList?.some((item) => item.id === categoryId))) return true

        return false
    }, [categoryId, id])

    return (
        <Link
            className={styles.containerLi}
            href={{
                query: {
                    ["category-id"]: id,
                },
            }}
            data-active={isActive}
        >
            <div data-title>
                {photoUrl ? (
                    <Image src={photoUrl} alt="icon" width={30} height={30} unoptimized />
                ) : (
                    <img src="/svg/globe-06.svg" alt="icon" width={30} height={30} />
                )}
                <a>{name}</a>
            </div>
        </Link>
    )
}
