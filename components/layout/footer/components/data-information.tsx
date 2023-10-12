"use client"

import { usePush } from "@/helpers/hooks/usePush"
import { LINKS_SECTION_FOOTER } from "../constants"

export const FooterComponentDataInformation = () => {
    const { handlePush } = usePush()

    function handle(value: string) {
        if (value) handlePush(value)
    }

    return (
        <section data-information>
            {LINKS_SECTION_FOOTER.map((item, index) => (
                <div
                    data-column
                    key={`${item.title}-${item.value}-title-${index}`}
                >
                    <h5>{item.title}</h5>
                    <article>
                        {item.links.map((link, index_) => (
                            <p
                                key={`${link.label}-${link.value}-p-${index_}`}
                                onClick={() => {
                                    handle(link.value)
                                }}
                            >
                                {link.label}
                            </p>
                        ))}
                    </article>
                </div>
            ))}
        </section>
    )
}
