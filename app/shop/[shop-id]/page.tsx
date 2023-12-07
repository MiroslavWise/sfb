import type { Metadata } from "next"

import { PublicShopId } from "@/components/pages/shop"

import client from "@/helpers/services/initApollo"
import { queryShopByIdMeta } from "@/apollo/query-"
import { CONFIG_ENV } from "@/helpers/config/ENV"

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const {
        data: {
            shopById: { name, description },
        },
    } = await client.query({
        query: queryShopByIdMeta,
        variables: { shopId: params["shop-id"] },
    })

    const url = new URL(`${CONFIG_ENV.url}/product/${params["shop-id"]}`)

    if (name) {
        return {
            title: `SFB - ${name}`,
            description: description,
            metadataBase: url,
        }
    } else {
        return {}
    }
}

export default function PagePublicShopId({ params }: IProps) {
    if (params["shop-id"]) return <PublicShopId id={params["shop-id"]} />
    return null
}

interface IProps {
    params: {
        ["shop-id"]: string
    }
}
