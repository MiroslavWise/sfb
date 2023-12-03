"use client"

import Link from "next/link"

import { LINKS_SOCIAL } from "../constants"

export const FooterComponentDataHeader = () => {
    return (
        <div data-header>
            <img src="/svg/logo.svg" alt="logo" width={54} height={25} />
            <div data-social-links>
                {LINKS_SOCIAL.map((item) => (
                    <Link href={item.path} target="_blank" key={`${item.path}----footer-social`}>
                        <img key={item.src} src={item.src} alt={item.alt} width={40} height={40} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
