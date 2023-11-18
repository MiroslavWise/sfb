import Image from "next/image"

import type { TItemMany } from "../types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import styles from "../styles/catalog-many.module.scss"

export const ItemMany: TItemMany = ({ id, name, photoUrl, childrenList }) => {
    const [active, , ref] = useOutsideClickEvent()
    const categoryId = useSearchParams().get("category-id")
    const { handleReplace } = usePush()

    const isActive = useMemo(() => {
        if (categoryId === id) return true
        if (childrenList?.some((item) => item.id === categoryId)) return true
        if (
            childrenList?.some(
                (item) =>
                    item.childrenList?.some((item) => item.id === categoryId),
            )
        )
            return true

        return false
    }, [categoryId, id])

    return (
        <li className={styles.containerLi} data-active={isActive} ref={ref}>
            <div
                data-title
                onClick={() => {
                    handleReplace(`/market?category-id=${id}`)
                }}
            >
                <Image
                    src={photoUrl ? photoUrl : "/svg/globe-06.svg"}
                    alt="icon"
                    width={30}
                    height={30}
                    unoptimized
                />
                <a>{name}</a>
            </div>
            {(active || isActive) && !!childrenList?.length
                ? childrenList.map((item) => (
                      <ItemMany key={`${item.id}-key-children`} {...item} />
                  ))
                : null}
        </li>
    )
}
