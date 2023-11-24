"use client"

import Link from "next/link"

import { usePush } from "@/helpers/hooks/usePush"

export const Logo = () => {
    const { handlePush } = usePush()

    function handleOnMain() {
        handlePush("/")
    }

    return (
        <Link href={"/"} data-logo>
            <img src="/svg/logo.svg" alt="logo" width={54} height={25} />
        </Link>
    )
}
