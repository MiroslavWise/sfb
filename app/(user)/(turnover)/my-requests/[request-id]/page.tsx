import { MyRequestsPageUUID } from "@/components/pages/my-requests"

export default function PageMyRequestId({ params }: { params: { ["request-id"]: string } }) {
    if (params["request-id"]) return <MyRequestsPageUUID id={params["request-id"]} />

    return null
}
