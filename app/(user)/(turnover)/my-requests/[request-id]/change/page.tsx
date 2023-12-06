import { MyRequestsPageChange } from "@/components/pages/my-requests/components/MyRequestsPageChange"

export default function PageMyRequestsChange({ params }: { params: { ["request-id"]: string } }) {
    if (params["request-id"]) return <MyRequestsPageChange id={params["request-id"]} />

    return null
}
