"use client"

import Image from "next/image"

import { usePush } from "@/helpers/hooks/usePush"

export const Logo = () => {
    const { handlePush } = usePush()

    function handleOnMain() {
        handlePush("/")
    }

    return (
        <Image
            data-logo
            src="/svg/logo.svg"
            alt="logo"
            width={54}
            height={25}
            onClick={handleOnMain}
        />
    )
}
