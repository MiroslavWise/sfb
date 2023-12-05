"use client"

import { usePush } from "@/helpers/hooks/usePush"

export const HeaderLayoutPublicShopId = () => {
    const { back } = usePush()

    return (
        <header>
            <img src="/svg/arrow-left.svg" height={32} width={32} alt="arrow-left" onClick={back} />
            <h3>Информация о магазине</h3>
        </header>
    )
}
