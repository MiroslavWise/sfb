"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLazyQuery } from "@apollo/client"

import { useDebounce } from "@/helpers/hooks/useDebounce"
import { queryCategoryRecommendation } from "@/apollo/attribute"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"

import styles from "../styles/search-block.module.scss"

export const SearchBlock = () => {
    const [loading, setLoading] = useState(false)
    const [focus, setFocus, ref] = useOutsideClickEvent()
    const [list, setList] = useState<null | any[]>(null)
    const { handleSubmit, register, setValue } = useForm<IValues>({
        mode: "onChange",
    })
    const [search, { data }] = useLazyQuery(queryCategoryRecommendation)
    function submit(values: IValues) {
        if (values.input.trim().length > 2)
            search({
                variables: {
                    search: values.input.trim(),
                },
            }).finally(() => {
                setLoading(false)
            })
    }
    const onSubmit = handleSubmit(submit)

    const debouncedValue = useDebounce(onSubmit, 1500)

    useEffect(() => {
        if (data) {
            setList(data?.categoryRecommendation || null)
        }
    }, [data?.categoryRecommendation])

    return (
        <form className={styles.container} onSubmit={onSubmit} ref={ref}>
            <div data-input>
                <input
                    placeholder="Поиск по предложениям..."
                    {...register("input")}
                    onChange={(event) => {
                        setLoading(true)
                        setFocus(true)
                        setValue("input", event.target.value)
                        debouncedValue()
                    }}
                    onFocus={() => setFocus(true)}
                />
                <Image
                    src={
                        loading
                            ? "/svg/loading-03.svg"
                            : "/svg/menu/search-refraction.svg"
                    }
                    alt="search-refraction"
                    width={24}
                    height={24}
                    data-loading={loading}
                />
            </div>
            {list && list?.length && focus ? (
                <ul data-visible={focus}>
                    {list?.map((item) =>
                        item?.family?.map((li: any) => (
                            <li key={`${item.id}-${li.id}`}>
                                <p>{item.name}</p>
                                <a>{li?.name}</a>
                            </li>
                        )),
                    )}
                </ul>
            ) : null}
        </form>
    )
}

interface IValues {
    input: string
}
