import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "next/navigation"

import type { ICategoriesChildren, IProductList } from "@/types/types"

import { queryProductList } from "@/apollo/query"
import { ItemProduct } from "./ItemProduct"

export const DataCategories = ({ items }: { items: ICategoriesChildren[] }) => {
    const categoryId = useSearchParams().get("category-id")

    const { data: dataProductList } = useQuery<IProductList>(queryProductList, {
        variables: { offset: 0, categoryId: categoryId },
    })

    const list = useMemo(() => {
        if (items?.find((_) => _.id === categoryId)) {
            return items?.find((_) => _.id === categoryId)?.childrenList!
        } else if (items?.some((item) => item?.childrenList?.some((item) => item?.id === categoryId))) {
            const id = items?.find((item) => item?.childrenList?.find((item) => item?.id === categoryId))?.id
            const listItems = items?.find((item) => item?.id === id)?.childrenList!

            return listItems?.find((item) => item?.id === categoryId)?.childrenList!
        } else {
            return []
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

    const listProducts = useMemo(() => {
        return dataProductList?.productList?.results! || []
    }, [dataProductList])

    return list?.length ? (
        <>
            <aside>
                {list?.map((a) => (
                    <Link
                        href={{
                            query: {
                                ["category-id"]: a?.id,
                            },
                        }}
                        data-active={categoryId === a?.id && !a?.childrenList?.length}
                    >
                        <Image src={a.photoUrl ? a.photoUrl : "/png/catalog/auto.png"} alt="icon" width={24} height={24} />
                        <span>{a.name}</span>
                    </Link>
                ))}
            </aside>
            <article>
                {listProducts?.length ? listProducts.map((item) => <ItemProduct key={`${item.id}-product`} {...item} />) : null}
            </article>
        </>
    ) : (
        <div data-products>
            <h3>{name}</h3>
            <section>
                {listProducts?.length ? listProducts.map((item) => <ItemProduct key={`${item.id}-product`} {...item} />) : null}
            </section>
        </div>
    )
}
