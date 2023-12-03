import { Merchandise } from "@/components/pages/shop"

export default function PageMerchandise({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <Merchandise id={params["shop-id"]} />

    return null
}
