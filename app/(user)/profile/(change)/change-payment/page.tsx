"use client"

import Image from "next/image"

export default function ChangePayment() {
    return (
        <>
            <header>
                <Image
                    data-image
                    src="/svg/profile/wallet.svg"
                    alt="change"
                    width={30}
                    height={30}
                />
                <h2>Изменить платежные данные</h2>
            </header>
        </>
    )
}
