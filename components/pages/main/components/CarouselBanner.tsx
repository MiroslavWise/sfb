"use client"

import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"

import {
    IItemCarouselBanner,
    ITEM_CAROUSEL_BANNER,
} from "../constants/ITEM-CAROUSEL"

import styles from "../styles/carousel-banner.module.scss"

export const ComponentCarouselBannerMainPage = ({
    type,
}: {
    type: "main" | "aside"
}) => {
    const [state, setState] = useState(0)

    const current: IItemCarouselBanner = useMemo(() => {
        return ITEM_CAROUSEL_BANNER.find((_, index) => index === state)!
    }, [state])

    useEffect(() => {
        const interval = setInterval(() => {
            setState((prev) =>
                prev !== ITEM_CAROUSEL_BANNER.length - 1 ? prev + 1 : 0,
            )
        }, 3888)

        return () => clearInterval(interval)
    }, [])

    function handle(value: number) {
        if (value !== state) setState(value)
    }

    return (
        <section className={styles.wrapper} data-type={type}>
            <div
                data-center
                style={{
                    background: current.color,
                }}
            >
                <h2>{current.label}</h2>
                <Image
                    data-img-banner
                    src={current.img.src}
                    alt={current.img.alt}
                    width={184}
                    height={135}
                    unoptimized
                />
                <Image
                    data-logo
                    src="/svg/logo.svg"
                    alt="logo"
                    width={86}
                    height={40}
                />
                <div data-dots>
                    {ITEM_CAROUSEL_BANNER.map((_, index) => (
                        <div
                            key={`${index}=dots`}
                            data-active={index === state}
                            onClick={() => handle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
