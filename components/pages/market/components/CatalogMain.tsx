"use client"

import { useMemo } from "react"
import { useQuery } from "@apollo/client"

import type { ICategoriesRoot } from "@/types/types"

import { DataCategories } from "./DataCategories"

import { queryCategoriesRoot } from "@/apollo/query"

import styles from "../styles/catalog-main.module.scss"

export const CatalogMain = () => {
    const { data } = useQuery<ICategoriesRoot>(queryCategoriesRoot, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-only",
    })

    const list = useMemo(() => {
        return data?.categoryRootList || []
    }, [data])

    return (
        <div className={styles.wrapper}>
            <DataCategories items={list} />
        </div>
    )
}
