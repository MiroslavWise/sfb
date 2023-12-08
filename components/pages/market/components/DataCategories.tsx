import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import type { ICategoriesChildren } from "@/types/types"

import { usePush } from "@/helpers/hooks/usePush"
import { ItemsProductQuery } from "./ItemsProductQuery"
import { Breadcrumbs } from "./Breadcrumbs"

export const DataCategories = ({ items }: { items: ICategoriesChildren[] }) => {
    const categoryId = useSearchParams().get("category-id")
    const categoryFullId = useSearchParams().get("category-full-id")
    const { handleReplace } = usePush()

    const listSecondary = useMemo(() => {
        const main = items?.find((item) => item?.id === categoryId)

        if (main) {
            return main?.childrenList?.map((item) => ({
                id: item?.id,
                title: item?.name,
                icon: item?.photoUrl,
                children: item.childrenList.map((item_) => ({
                    id: item_?.id,
                    title: item_?.name,
                    icon: item_?.photoUrl,
                })),
            }))
        } else {
            return null
        }
    }, [items, categoryId])

    const name = useMemo(() => {
        if (items?.find((_) => _.id === categoryId)) {
            return items?.find((_) => _.id === categoryId)?.name!
        } else if (items?.some((item) => item?.childrenList?.some((item) => item?.id === categoryId))) {
            const id = items?.find((item) => item?.childrenList?.find((item) => item?.id === categoryId))?.id
            const listItems = items?.find((item) => item?.id === id)?.childrenList!

            return listItems?.find((item) => item?.id === categoryId)?.name!
        } else if (items?.some((item) => item?.childrenList?.some((item) => item?.childrenList?.some((item) => item.id === categoryId)))) {
            const id = items?.find((item) =>
                item?.childrenList?.find((item) => item?.childrenList?.find((item) => item.id === categoryId)),
            )?.id
            const listItems = items?.find((item) => item?.id === id)?.childrenList!
            const listItems_ = listItems
                ?.find((item) => item?.childrenList?.find((item) => item?.id === categoryId))
                ?.childrenList?.find((item) => item?.id === categoryId)?.name

            return listItems_!
        }

        return null
    }, [categoryId, items])

    return categoryFullId ? (
        <div data-products>
            <Breadcrumbs id={categoryId!} idFull={categoryFullId!} items={items} />
            <h3>{name}</h3>
            <div data-flow>
                <aside></aside>
                <section>{categoryFullId ? <ItemsProductQuery id={categoryFullId} /> : null}</section>
            </div>
        </div>
    ) : (
        <section>
            <aside>
                {items?.map((a) => (
                    <Link
                        href={{
                            query: {
                                ["category-id"]: a?.id,
                            },
                        }}
                        data-active={categoryId === a?.id}
                    >
                        <Image src={a.photoUrl ? a.photoUrl : "/png/catalog/auto.png"} alt="icon" width={24} height={24} unoptimized />
                        <span>{a.name}</span>
                        <img data-right src="/svg/chevron-right-red.svg" alt="chevron-right-red" width={12} height={12} />
                    </Link>
                ))}
            </aside>
            {listSecondary ? (
                <article>
                    {listSecondary.map((item) => (
                        <div data-second>
                            <Image src={item.icon ? item.icon : "/png/catalog/auto.png"} alt="icon" width={50} height={50} unoptimized />
                            <section>
                                <Link
                                    data-title
                                    href={{
                                        query: {
                                            ["category-id"]: categoryId,
                                            ["category-full-id"]: item?.id,
                                        },
                                    }}
                                >
                                    {item?.title}
                                </Link>
                                {item.children.map((_) => (
                                    <Link
                                        href={{
                                            query: {
                                                ["category-id"]: categoryId,
                                                ["category-full-id"]: _?.id,
                                            },
                                        }}
                                    >
                                        {_?.title}
                                    </Link>
                                ))}
                            </section>
                        </div>
                    ))}
                </article>
            ) : null}
        </section>
    )
}
