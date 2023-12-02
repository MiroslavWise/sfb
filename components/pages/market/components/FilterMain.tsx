"use client"

import { useMemo } from "react"

import type { IFilterMain } from "../types/types"

export const FilterMain = ({ label, type, dispatch, typeFilter }: IFilterMain) => {
    const icon: string = useMemo(() => {
        if (typeFilter === "price") {
            if (type) {
                return "/svg/arrow-narrow-up-right.svg"
            } else {
                return "/svg/arrow-narrow-down-right.svg"
            }
        }

        return "/svg/chevron-down-primary.svg"
    }, [typeFilter, type])

    return (
        <div data-filter onClick={dispatch}>
            <p>{label}</p>
            <img data-active={typeFilter ? false : type} data-type={typeFilter} src={icon} alt="primary" width={24} height={24} />
        </div>
    )
}
