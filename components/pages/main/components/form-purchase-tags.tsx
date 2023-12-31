import { useLazyQuery } from "@apollo/client"
import { useEffect, useMemo, useState } from "react"
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

import type { IValuesForm } from "./form-purchase"
import type { IProductAttributeList } from "@/types/types"

import { CustomSelector } from "@/components/common/custom-selector"

import { queryProductAttributesByCategoryId } from "@/apollo/attribute"

import styles from "../styles/form-purchase-tags.module.scss"

export const FormPurchaseTags = ({ categoryId, register, watch, setValue }: IProps) => {
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
    categoryId: string | null
    register: UseFormRegister<IValuesForm>
    watch: UseFormWatch<IValuesForm>
    setValue: UseFormSetValue<IValuesForm>
}
