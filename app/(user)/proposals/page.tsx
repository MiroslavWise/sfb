"use client"

import { useSearchParams } from "next/navigation"

import { PageProposals } from "@/components/pages/proposals/layout/Page"
import { ProposalsPageUUID } from "@/components/pages/proposals/layout/ProposalsPage"

export default function Proposals() {
    const id = useSearchParams().get("proposal-id")

    if (id) return <ProposalsPageUUID />

    return <PageProposals />
}
