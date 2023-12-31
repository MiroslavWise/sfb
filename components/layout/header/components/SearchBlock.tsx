"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLazyQuery } from "@apollo/client"

import { usePush } from "@/helpers/hooks/usePush"
import { useDebounce } from "@/helpers/hooks/useDebounce"
import { queryCategoryRecommendation } from "@/apollo/attribute"
import { useOutsideClickEvent } from "@/helpers/hooks/useOutsideClickEvent"
import { ICategoryRecommendation, IRecommendation } from "@/types/types"

import styles from "../styles/search-block.module.scss"

export const SearchBlock = () => {
    const [loading, setLoading] = useState(false)
    const [focus, setFocus, ref] = useOutsideClickEvent()
    const { handlePush } = usePush()
    const [list, setList] = useState<null | IRecommendation[]>(null)
    const { handleSubmit, register, setValue } = useForm<IValues>({
        mode: "onChange",
    })
    const [search, { data }] = useLazyQuery<ICategoryRecommendation>(queryCategoryRecommendation)
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
                <img
                    src={loading ? "/svg/loading-03.svg" : "/svg/menu/search-refraction.svg"}
                    alt="search-refraction"
                    width={24}
                    height={24}
                    data-loading={loading}
                />
            </div>
            {list && list?.length && focus ? (
                <ul data-visible={focus}>
                    {list?.map((item) => (
                        <li
                            key={`${item.id}-${item.id}`}
                            onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                handlePush(`/market?search=${item?.name}&category-id=${item.id}`)
                                setFocus(false)
                            }}
                        >
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            ) : null}
        </form>
    )
}

interface IValues {
    input: string
}
