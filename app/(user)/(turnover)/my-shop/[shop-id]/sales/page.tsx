import { Sales } from "@/components/pages/shop"

export default function PageSales({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <Sales id={params["shop-id"]} />

    return null
}
