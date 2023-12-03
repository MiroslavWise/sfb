import { DeliveryOfGoods } from "@/components/pages/shop"

export default function PageDeliveryOfGoods({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <DeliveryOfGoods />
    return null
}
