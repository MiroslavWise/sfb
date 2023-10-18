"use client"

import { ItemHeaderCurrentMyProposals } from "./ItemHeaderCurrentMyProposals"

import styles from "../styles/header-my-proposals.module.scss"
import { useQuery } from "@apollo/client"
import { productListMe_ID_NAME } from "@/apollo/query"

export const HeaderMyProposals = () => {
    const { data } = useQuery<{
        productListMe: {
            totalCount: number
            results: {
                id: string
                name: string
            }[]
        }
    }>(productListMe_ID_NAME)

    const { productListMe } = data ?? {}

    return (
        <ul className={styles.header}>
            {Array.isArray(productListMe?.results)
                ? productListMe?.results?.map((item) => (
                      <ItemHeaderCurrentMyProposals
                          label={item.name}
                          key={`${item.id}-proposals`}
                          value={item.id}
                      />
                  ))
                : null}
        </ul>
    )
}
