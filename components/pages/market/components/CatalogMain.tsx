"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import { ICategoriesRoot } from "@/types/types"

import { CatalogMany } from "./CatalogMany"
import { ItemLinkCategory } from "./ItemLinkCategory"

import { queryCategoriesRoot } from "@/apollo/query"

import styles from "../styles/catalog-main.module.scss"
import { DataCategories } from "./DataCategories"

export const CatalogMain = () => {
    const categoryId = useSearchParams().get("category-id")
    const { data } = useQuery<ICategoriesRoot>(queryCategoriesRoot)

    const list = useMemo(() => {
        return data?.categoryRootList || []
    }, [data])

    return (
        <div className={styles.wrapper}>
            <nav>
                {list.map((item) => (
                    <ItemLinkCategory {...item} />
                ))}
            </nav>
            <section data-is-category={!!categoryId}>
                {!!categoryId ? (
                    <DataCategories items={list} />
                ) : (
                    list.map((item) => (
                        <Link
                            href={{
                                query: {
                                    ["category-id"]: item.id,
                                },
                            }}
                        >
                            <h2>{item.name}</h2>
                        </Link>
                    ))
                )}
            </section>
        </div>
    )
}
