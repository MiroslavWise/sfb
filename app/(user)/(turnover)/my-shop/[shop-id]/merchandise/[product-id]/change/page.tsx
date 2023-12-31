import { MerchandiseChangeId } from "@/components/pages/shop"

export default function Page({ params }: { params: { ["shop-id"]: string; ["product-id"]: string } }) {
    if (params["product-id"] && params["shop-id"]) return <MerchandiseChangeId id={params["shop-id"]} productId={params["product-id"]} />

    return null
}
