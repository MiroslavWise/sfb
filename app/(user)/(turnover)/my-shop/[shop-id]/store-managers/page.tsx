import { StoreManagers } from "@/components/pages/shop"

export default function PageStoreManagers({ params }: { params: { ["shop-id"]: string } }) {
    if (params["shop-id"]) return <StoreManagers />

    return null
}
