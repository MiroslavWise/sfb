"use client"

import type { TTabsDetails } from "./types"

import styles from "./style.module.scss"
import Image from "next/image"

export const TabsDetails: TTabsDetails = ({ items, current, set }) => {
    return (
        <div className={styles.container} data-tabs>
            <ul>
                {items.map((item) => (
                    <li
                        data-active={current.value === item.value}
                        key={`${item.value}-tab`}
                        onClick={(event) => {
                            event.stopPropagation()
                            event.preventDefault()
                            set(item)
                        }}
                    >
                        {item.icon ? (
                            <Image
                                src={item.icon!}
                                alt={item.icon!}
                                width={18}
                                height={18}
                            />
                        ) : null}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
