import { PublicProductsId } from "@/components/pages/shop"

export default function PagePublicProductsId({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <PublicProductsId id={params["shop-id"]} />

    return null
}
