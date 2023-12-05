import { PublicShopId } from "@/components/pages/shop"

export default function PagePublicShopId({ params }: { params: { ["shop-id"]: string } }) {
    console.log("params: ", params["shop-id"])

    if (params["shop-id"]) return <PublicShopId id={params["shop-id"]} />
    return null
}
