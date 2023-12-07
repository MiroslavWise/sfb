import type { Metadata } from "next"

import { ProductId } from "@/components/pages/more-details"

import client from "@/helpers/services/initApollo"
import { queryProductByIdMeta } from "@/apollo/query"
import { IProductRoot } from "@/types/types"

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    try {
        const {
            data: {
                productById: { name, description },
            },
            error,
        } = await client.query<IProductRoot>({
            query: queryProductByIdMeta,
            variables: { id: params["product-id"] },
        })

        if (name) {
            return {
                title: `SFB - ${name}`,
                description: description,
            }
        } else {
            return {
                description: error?.clientErrors?.map((item) => item.message)?.join(", "),
            }
        }
    } catch (e) {
        return {
            title: `Не существующая страница`,
            description: "Ошибка загрузки страницы",
        }
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
