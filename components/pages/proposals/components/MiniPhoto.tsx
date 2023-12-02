"use client"

import Image from "next/image"

interface IProps {
    src: string
}

export const MiniPhoto = ({ src }: IProps) => <Image src={src} alt={src} width={200} height={200} unoptimized />
