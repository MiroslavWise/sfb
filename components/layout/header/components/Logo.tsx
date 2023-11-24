"use client"

import Link from "next/link"
import Image from "next/image"

import { usePush } from "@/helpers/hooks/usePush"

export const Logo = () => {
    const { handlePush } = usePush()

    function handleOnMain() {
        handlePush("/")
    }

    return (
        <Link href={"/"} data-logo>
            <Image src="/svg/logo.svg" alt="logo" width={54} height={25} />
        </Link>
    )
}
