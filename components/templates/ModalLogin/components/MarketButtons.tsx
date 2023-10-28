"use client"

import Image from "next/image"

export const MarketButtons = () => {
    return (
        <div data-market>
            <Image
                src="/market/apple-s.svg"
                alt="apple"
                width={179}
                height={57}
            />
            <Image
                src="/market/play-m.svg"
                alt="play"
                width={178}
                height={57}
            />
        </div>
    )
}
