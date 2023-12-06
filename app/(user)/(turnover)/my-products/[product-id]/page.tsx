import { MyProductPageUUID } from "@/components/pages/my-product"

export default function PageProductId({ params }: { params: { ["product-id"]: string } }) {
    if (params["product-id"]) return <MyProductPageUUID id={params["product-id"]} />

    return null
}
