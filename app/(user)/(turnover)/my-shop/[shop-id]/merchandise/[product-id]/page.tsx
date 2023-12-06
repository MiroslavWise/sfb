import { MerchandiseId } from "@/components/pages/shop"

interface IProps {
    params: {
        ["product-id"]: string
        ["shop-id"]: string
    }
}

export default function PageMerchandiseId({ params }: IProps) {
    if (params["product-id"] && params["shop-id"]) return <MerchandiseId id={params["shop-id"]} productId={params["product-id"]} />

    return null
}
