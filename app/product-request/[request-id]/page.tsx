import type { Metadata } from "next"

import { RequestId } from "@/components/pages/more-details"

import client from "@/helpers/services/initApollo"
import { queryProductRequestByIdMeta } from "@/apollo/query"

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const {
        data: {
            productRequestById: { name, description },
        },
    } = await client.query({
        query: queryProductRequestByIdMeta,
        variables: { id: params["request-id"] },
    })

    if (name) {
        return {
            title: `SFB - ${name}`,
            description: description,
        }
    } else {
        return {}
    }
}

export default function PageProductRequest({ params }: IProps) {
    if (params["request-id"]) return <RequestId id={params["request-id"]} />

    return null
}

interface IProps {
    params: {
        ["request-id"]: string
    }
}
