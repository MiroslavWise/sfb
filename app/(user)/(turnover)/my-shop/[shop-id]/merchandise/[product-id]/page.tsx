import { MerchandiseId } from "@/components/pages/shop"

export default function PageMerchandiseId({ params }: { params: { ["shop-id"]: string; ["product-id"]: string } }) {
    if (params["product-id"] && params["shop-id"]) return <MerchandiseId id={params["shop-id"]} productId={params["product-id"]} />

    return null
}
