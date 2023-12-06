"use client"

import { useLazyQuery } from "@apollo/client"
import { useEffect, useMemo, useState } from "react"
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

import type { IProductAttributeList } from "@/types/types"

import { queryProductAttributesByCategoryId } from "@/apollo/attribute"

import styles from "./style.module.scss"
import { CustomSelector } from "../custom-selector"

export function CustomsAttributes(props: IProps) {
    const [isList, setIsList] = useState(false)
    const { categoryId, register, watch, setValue } = props
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
                            <div key={`${item.id}-${item.slug}`} {...register(`${item.id}:attr`, { required: false })}>
                                <CustomSelector
                                    label={item.name}
                                    valueTag={
                                        item?.enumGroup?.values?.find((_) => `${_?.id}` === watch(`${item.id}:attr` as string))?.value
                                    }
                                    placeholder={item.description}
                                    onClick={(value) => {
                                        setValue(`${item.id!}:attr`, value)
                                    }}
                                    list={
                                        item?.enumGroup?.values?.map((item_) => ({
                                            id: item_.id,
                                            p: item_.value,
                                        })) || []
                                    }
                                />
                            </div>
                        ))}
                </section>
            ) : null}
        </div>
    )
}

interface IProps {
    categoryId: string
    register: UseFormRegister<any | { [key: string]: string }>
    watch: UseFormWatch<any | { [key: string]: string }>
    setValue: UseFormSetValue<any | { [key: string]: string }>
}
