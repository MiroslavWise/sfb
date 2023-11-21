"use client"

import { useSearchParams } from "next/navigation"

import { PageArchive, PageArchiveUUID } from "@/components/pages/archive"

import { useTitle } from "@/helpers/hooks/useTitle"

export default async function Archive() {
    useTitle("Архив")
    const uuid = useSearchParams().get("archive-id")

    if (uuid) return <PageArchiveUUID />
    return <PageArchive />
}
