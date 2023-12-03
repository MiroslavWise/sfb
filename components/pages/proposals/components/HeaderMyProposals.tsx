"use client"

import { useQuery } from "@apollo/client"

import { ItemHeaderCurrentMyProposals } from "./ItemHeaderCurrentMyProposals"

import { productListMe_ID_NAME } from "@/apollo/query"

import styles from "../styles/header-my-proposals.module.scss"

export const HeaderMyProposals = () => {
    const { data } = useQuery<{
        productListMe: {
            totalCount: number
            results: {
                id: string
                name: string
            }[]
        }
    }>(productListMe_ID_NAME, {
        partialRefetch: false,
    })

    const { productListMe } = data ?? {}

    return (
        <ul className={styles.header}>
            {Array.isArray(productListMe?.results)
                ? productListMe?.results?.map((item) => (
                      <ItemHeaderCurrentMyProposals key={`${item.id}-proposals`} label={item.name} value={item.id} />
                  ))
                : null}
        </ul>
    )
}
