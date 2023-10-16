"use client"

import type { TItemProposalsPage } from "../types/types"

import styles from "../styles/item-proposals-page.module.scss"
import Image from "next/image"

export const ItemProposalsPage: TItemProposalsPage = ({}) => {
    return (
        <section className={styles.container}>
            <div data-image>
                <Image
                    src="/png/b73755ed39aaf014aea297d3aeb25e1d.jpeg"
                    alt="banner"
                    width={300}
                    height={300}
                    unoptimized
                />
            </div>
            <div data-name>
                <section data-title-price>
                    <h2>Бампер Toyota Land Cruiser Prado</h2>
                    <h2 data-price>85 000 ₸</h2>
                </section>
                <section data-category-location></section>
            </div>
        </section>
    )
}
