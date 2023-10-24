"use client"

import Image from "next/image"
import { memo, useMemo, useState } from "react"
import { IProductOfferItem } from "@/types/types"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item-proposal.module.scss"

const $ItemProposal = (props: IProductOfferItem) => {
    const { user } = useAuth()
    const { id, product, productRequest } = props ?? {}
    const { id: userId } = user ?? {}
    const [state, setState] = useState(0)
    const { handleReplace } = usePush()

    const imagesRequest = useMemo(() => {
        if (!productRequest?.photoListUrl?.length) {
            return []
        }
        return (
            productRequest?.photoListUrl
                ?.filter((item) => item?.photoUrl)
                ?.map((item, index) => ({
                    file: item,
                    index: index,
                })) || []
        )
    }, [productRequest?.photoListUrl])

    function handle() {
        handleReplace(
            `/proposals?proposal-id=${product?.id}:${productRequest?.id}`,
        )
    }

    return (
        <div className={styles.container} onClick={handle} data-item>
            <div
                data-image-container
                onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                }}
            >
                {imagesRequest.length ? (
                    <Image
                        src={
                            imagesRequest.find((item) => item.index === state)
                                ?.file?.photoUrl!
                        }
                        alt="photo"
                        width={450}
                        height={450}
                        unoptimized
                    />
                ) : (
                    <div data-null />
                )}
                {imagesRequest.length ? (
                    <div data-images-small>
                        {imagesRequest.slice(0, 3).map((item) => (
                            <Image
                                src={item.file.photoUrl!}
                                alt={item.file.id}
                                width={450}
                                height={450}
                                onClick={() => setState(item.index)}
                                data-active={item.index === state}
                                unoptimized
                            />
                        ))}
                    </div>
                ) : null}
            </div>
            <section>
                <article>
                    <h2>{productRequest?.name}</h2>
                    <h2 data-price>{productRequest?.price} ₸</h2>
                </article>
                <article>
                    <div data-category>
                        <p>{productRequest?.category?.name}</p>
                    </div>
                    <a>г. Алматы, Советский р-он</a>
                </article>
            </section>
        </div>
    )
}

export const ItemProposal = memo($ItemProposal)
