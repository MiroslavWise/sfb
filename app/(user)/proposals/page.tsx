"use client"

import {
    HeaderMyProposals,
    ItemProposalsPage,
} from "@/components/pages/proposals"

export default function Proposals() {
    return (
        <>
            {/* <HeaderMyProposals /> */}
            <article>
                <ItemProposalsPage />
                <ItemProposalsPage />
                <ItemProposalsPage />
                <ItemProposalsPage />
                <ItemProposalsPage />
                <ItemProposalsPage />
            </article>
        </>
    )
}
