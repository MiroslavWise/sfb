"use client"

import Image from "next/image"
import { type DispatchWithoutAction } from "react"

interface IProps {
    src: string
    loaded?: boolean
    onClick?: DispatchWithoutAction
}

export const MiniPhoto = ({ src, loaded, onClick }: IProps) => (
    <Image data-loaded={!!loaded} src={src} alt={src} width={200} height={200} unoptimized />
)
