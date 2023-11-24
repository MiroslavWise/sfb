"use client"

import { LINKS_SOCIAL } from "../constants"

export const FooterComponentDataHeader = () => {
    return (
        <div data-header>
            <img src="/svg/logo.svg" alt="logo" width={54} height={25} />
            <div data-social-links>
                {LINKS_SOCIAL.map((item) => (
                    <img
                        key={item.src}
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
