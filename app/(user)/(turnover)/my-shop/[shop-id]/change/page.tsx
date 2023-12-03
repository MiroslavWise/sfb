import { ChangeShop } from "@/components/pages/shop/components/Change"

export default function ShopChange({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <ChangeShop id={params["shop-id"]!} />
    return null
}
