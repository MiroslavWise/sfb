import Link from "next/link"
import { useMemo } from "react"

import type { ICategoriesChildren } from "@/types/types"

import styles from "../styles/breadcrumbs.module.scss"

export const Breadcrumbs = ({ id, idFull, items }: { id: string; idFull: string; items: ICategoriesChildren[] }) => {
    const mainBread = useMemo(() => {
        if (id && items.length) {
            const bread = items.find((item) => item.id === id)

            return {
                id: bread?.id,
                label: bread?.name,
                children: bread?.childrenList,
            }
        }

        return null
    }, [items, id])

    const secondaryBread = useMemo(() => {
        if (idFull && mainBread) {
            const first = mainBread?.children?.find((item) => item?.id === idFull)
            const second = mainBread?.children?.find((item) => item?.childrenList?.some((item_) => item_?.id === idFull))
            if (first) {
                return {
                    id: first.id,
                    label: first?.name,
                }
            }
            if (second) {
                return {
                    id: second.id,
                    label: second.name,
                    child: {
                        id: second?.childrenList?.find((item) => item.id === idFull)?.id,
                        label: second?.childrenList?.find((item) => item.id === idFull)?.name,
                    },
                }
            }
        }

        return null
    }, [mainBread, idFull])

    console.log("secondaryBread: ", secondaryBread)

    return (
        <nav className={styles.nav}>
            <Link
                href={{
                    pathname: "/market",
                }}
            >
                Маркет
            </Link>
            {mainBread ? (
                <>
                    <img data-right src="/svg/chevron-right-red.svg" alt="chevron-right-red" width={16} height={16} />
                    <Link
                        href={{
                            query: {
                                ["category-id"]: mainBread?.id,
                            },
                        }}
                    >
                        {mainBread?.label!}
                    </Link>
                </>
            ) : null}
            {secondaryBread ? (
                <>
                    <img data-right src="/svg/chevron-right-red.svg" alt="chevron-right-red" width={16} height={16} />
                    <Link
                        href={{
                            query: {
                                ["category-id"]: mainBread?.id,
                                ["category-full-id"]: secondaryBread?.id,
                            },
                        }}
                    >
                        {secondaryBread?.label}
                    </Link>
                    {secondaryBread?.child ? (
                        <>
                            <img data-right src="/svg/chevron-right-red.svg" alt="chevron-right-red" width={16} height={16} />
                            <Link
                                href={{
                                    query: {
                                        ["category-id"]: mainBread?.id,
                                        ["category-full-id"]: secondaryBread?.child?.id,
                                    },
                                }}
                            >
                                {secondaryBread?.child?.label}
                            </Link>
                        </>
                    ) : null}
                </>
            ) : null}
        </nav>
    )
}
