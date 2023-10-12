"use client"

import Image from "next/image"

import { LINKS_SOCIAL } from "../constants"

export const FooterComponentDataHeader = () => {
    return (
        <div data-header>
            <Image src="/svg/logo.svg" alt="logo" width={54} height={25} />
            <div data-social-links>
                {LINKS_SOCIAL.map((item) => (
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={40}
                        height={40}
                    />
                ))}
            </div>
        </div>
    )
}
