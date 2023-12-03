import { BasicInformation } from "@/components/pages/shop"

export default function PageShopId({ params }: { params: { ["shop-id"]: string } }) {
    if (!params["shop-id"]) return null

    return <BasicInformation id={params["shop-id"]} />
}
