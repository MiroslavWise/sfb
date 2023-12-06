import { MyProductChange } from "@/components/pages/my-product"

export default function PageProductIdChange({ params }: { params: { ["product-id"]: string } }) {
    if (params["product-id"]) return <MyProductChange id={params["product-id"]} />

    return null
}
