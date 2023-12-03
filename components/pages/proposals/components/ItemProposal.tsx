"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { memo, useMemo, useState } from "react"

import { IProductOfferItem } from "@/types/types"

import { ComponentAddress, ComponentArea, ComponentCity } from "@/components/common/component-regions"

import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/item-proposal.module.scss"

const $ItemProposal = (props: IProductOfferItem) => {
    const user = useAuth(({ user }) => user)
    const { id, product, productRequest, createdAt } = props ?? {}
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
        handleReplace(`/proposals?proposal-id=${product?.id}:${productRequest?.id}`)
    }

    console.log("%cprops", "color: blue;", props)

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
                        src={imagesRequest.find((item) => item.index === state)?.file?.photoUrl!}
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
                                key={`${item.index}-qwerrr1-1234`}
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
                    <h2 data-price>{Number(productRequest?.price)?.toFixed(0) || 0} ₸</h2>
                </article>
                <article>
                    <div data-category>
                        <p>{productRequest?.category?.name}</p>
                    </div>
                    <div data-regions>
                        {productRequest?.author?.city?.region && <ComponentArea name={productRequest?.author?.city?.region?.name!} />}
                        {productRequest?.author?.city && <ComponentCity name={productRequest?.author?.city?.name} />}
                        {productRequest?.author?.address && <ComponentAddress name={productRequest?.author?.address} />}
                    </div>
                </article>
            </section>
            <div data-author>
                <div data-avatar-name>
                    {productRequest?.author?.photo! ? (
                        <Image src={productRequest?.author?.photo} alt="avatar" width={300} height={300} unoptimized />
                    ) : (
                        <div />
                    )}
                    <p>{productRequest?.author?.fullName}</p>
                </div>
                <div data-rating>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <img key={`${item}-ite,`} src="/svg/shape.svg" alt="shape" width={16} height={16} />
                    ))}
                    <p>4.8</p>
                </div>
            </div>
            <div data-date>
                <img src="/svg/calendar-plus-02.svg" alt="calendar" width={16} height={16} />
                {dayjs(createdAt).format("HH:mm DD.MM.YYYY")}
            </div>
        </div>
    )
}

export const ItemProposal = memo($ItemProposal)
