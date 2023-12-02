"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import { ICategoriesRoot } from "@/types/types"

import { CatalogMany } from "./CatalogMany"

import { usePush } from "@/helpers/hooks/usePush"
import { queryCategoriesRoot } from "@/apollo/query"

import styles from "../styles/catalog-main.module.scss"

export const CatalogMain = () => {
    const categoryId = useSearchParams().get("category-id")
    const { data } = useQuery<ICategoriesRoot>(queryCategoriesRoot)
    const { handleReplace } = usePush()

    const list = useMemo(() => {
        return data?.categoryRootList || []
    }, [data])

    return categoryId ? (
        <CatalogMany />
    ) : (
        <ul className={styles.wrapper}>
            {list.map((item) => (
                <li
                    key={`${item.id}-key`}
                    onClick={() => {
                        handleReplace(`/market?category-id=${item.id}`)
                    }}
                >
                    <Image src={item.photoUrl ? item?.photoUrl : "/png/catalog/auto.png"} alt="icon" width={200} height={200} unoptimized />
                    <p>{item.name}</p>
                </li>
            ))}
        </ul>
    )
}
