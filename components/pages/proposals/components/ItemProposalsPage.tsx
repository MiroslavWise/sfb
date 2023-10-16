"use client"

import dayjs from "dayjs"
import { useId } from "react"
import Image from "next/image"

import type { TItemProposalsPage } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item-proposals-page.module.scss"

export const ItemProposalsPage: TItemProposalsPage = ({}) => {
    const id = useId()

    const { handlePush } = usePush()

    return (
        <section
            className={styles.container}
            onClick={() => {
                handlePush(`/proposals/about/${id}`)
            }}
        >
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
                <section data-category-location>
                    <a>Б/у, автозапчасти, бампера</a>
                    <p>г. Алматы, Советский р-он</p>
                </section>
            </div>
            <div data-author>
                <div data-avatar-name>
                    <div />
                    <p>Мурад А.</p>
                </div>
                <div data-rating>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Image
                            key={`${item}-${id}`}
                            src="/svg/shape.svg"
                            alt="shape"
                            width={16}
                            height={16}
                        />
                    ))}
                    <p>4.8</p>
                </div>
            </div>
            <p data-date>Сегодня, {dayjs().format("HH:mm")}</p>
        </section>
    )
}
