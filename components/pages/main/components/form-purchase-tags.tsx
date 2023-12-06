import { useEffect, useMemo, useState } from "react"
import { useLazyQuery } from "@apollo/client"

import type { IProductAttributeList } from "@/types/types"

import { CustomSelector } from "@/components/common/custom-selector"

import { queryProductAttributesByCategoryId } from "@/apollo/attribute"

import styles from "../styles/form-purchase-tags.module.scss"

export const FormPurchaseTags = ({ categoryId }: IProps) => {
    const [isList, setIsList] = useState(false)
    const [useAttribute, { data }] = useLazyQuery<IProductAttributeList>(queryProductAttributesByCategoryId, {
        variables: { categoryId },
    })

    const listAttributes = useMemo(() => {
        return data?.productAttributesByCategoryId?.attribute || null
    }, [data])

    useEffect(() => {
        if (categoryId) {
            useAttribute()
        }
    }, [categoryId])

    return (
        <div className={styles.container}>
            {listAttributes && listAttributes?.length ? (
                <a
                    onClick={() => {
                        setIsList((prev) => !prev)
                    }}
                >
                    {isList ? "Атрибуты" : "Показать больше атрибутов"}
                </a>
            ) : null}
            {isList ? (
                <section>
                    {listAttributes &&
                        listAttributes?.map((item) => (
                            <CustomSelector
                                key={`${item.id}-${item.slug}`}
                                label={item.name}
                                placeholder={item.description}
                                onClick={() => {}}
                                list={[]}
                            />
                        ))}
                </section>
            ) : null}
        </div>
    )
}

interface IProps {
    categoryId: string | null
}
