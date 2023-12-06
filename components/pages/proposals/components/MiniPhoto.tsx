"use client"

import Image from "next/image"

interface IProps {
    src: string
    loaded?: boolean
}

export const MiniPhoto = ({ src, loaded }: IProps) => (
    <Image data-loaded={!!loaded} src={src} alt={src} width={200} height={200} unoptimized />
)
