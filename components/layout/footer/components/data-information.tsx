"use client"

import Link from "next/link"

import { LINKS_SECTION_FOOTER } from "../constants"

export const FooterComponentDataInformation = () => {
    return (
        <section data-information>
            {LINKS_SECTION_FOOTER.map((item, index) => (
                <div data-column key={`${item.title}-${item.value}-title-${index}`}>
                    <h5>{item.title}</h5>
                    <article>
                        {item.links.map((link, index_) => (
                            <Link key={`${link.label}-${link.value}-p-${index_}`} href={link.value ? link.value : "/"}>
                                {link.label}
                            </Link>
                        ))}
                    </article>
                </div>
            ))}
        </section>
    )
}
