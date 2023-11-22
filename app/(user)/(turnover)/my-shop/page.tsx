"use client"

import { useQuery } from "@apollo/client"

import type { IListShop } from "@/types/shop"

import { ButtonCreate } from "@/components/pages/shop"

import { queryShopList } from "@/apollo/query-"

import styles from "./page.module.scss"

export default async function MyShop({}) {
    const { data } = useQuery<IListShop>(queryShopList)

    return (
        <section className={styles.wrapper}>
            <header>
                <ButtonCreate />
            </header>
        </section>
    )
}
