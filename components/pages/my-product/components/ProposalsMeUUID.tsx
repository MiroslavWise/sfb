"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"

import type { IProductOfferListRoot } from "@/types/types"

import { ItemProposal } from "../../proposals/components/ItemProposal"

import { queryProductOfferList } from "@/apollo/query-offers"

import styles from "../styles/proposals-me-uuid.module.scss"

export const ProposalsMeUUID = ({ id }: { id: string }) => {
    const { data } = useQuery<IProductOfferListRoot>(queryProductOfferList, {
        variables: {
            product_Id: id,
        },
    })

    const items = useMemo(() => {
        if (!data || !data?.productOfferList?.results?.length) {
            return null
        }
        return data?.productOfferList?.results
    }, [data?.productOfferList])

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
        >
            {items ? (
                items?.map((item) => <ItemProposal key={`${item.id}-proposals-item`} {...item} />)
            ) : (
                <h2>
                    По вашим товарам вам ещё не поступило предложений. Возможно, вам нужно указать более точное название или более
                    конкретную категорию
                </h2>
            )}
        </motion.div>
    )
}
