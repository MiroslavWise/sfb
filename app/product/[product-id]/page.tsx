import type { Metadata } from "next"

import client from "@/helpers/services/initApollo"
import { queryProductByIdMeta } from "@/apollo/query"
import { ProductId } from "@/components/pages/more-details"

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const {
        data: {
            productById: { name, description },
        },
    } = await client.query({
        query: queryProductByIdMeta,
        variables: { id: params["product-id"] },
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

export default function PageProduct({ params }: IProps) {
    if (params["product-id"]) return <ProductId id={params["product-id"]} />

    return null
}

interface IProps {
    params: {
        ["product-id"]: string
    }
}
