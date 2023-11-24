"use client"

import { useSearchParams } from "next/navigation"

import { ShopUUIDPage } from "@/components/pages/shop"
import { ButtonCreate, ShopMainPage } from "@/components/pages/shop"

import styles from "./page.module.scss"

export default function MyShop({}) {
    const id = useSearchParams().get("id")

    return (
        <section className={styles.wrapper}>
            {id ? (
                <ShopUUIDPage />
            ) : (
                <>
                    <header>
                        <ButtonCreate />
                    </header>
                    <ShopMainPage />
                </>
            )}
        </section>
    )
}
