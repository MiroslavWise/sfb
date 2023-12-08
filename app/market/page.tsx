import { type Metadata } from "next"

import { SearchBar, CatalogMain } from "@/components/pages/market"

import client from "@/helpers/services/initApollo"

import styles from "./page.module.scss"
import { queryCategoriesRoot } from "@/apollo/query"
import { ICategoriesRoot } from "@/types/types"

export async function generateMetadata({}): Promise<Metadata> {
    try {
        const {
            data: { categoryRootList },
        } = await client.query<ICategoriesRoot>({
            query: queryCategoriesRoot,
        })

        const description = categoryRootList
            .map(
                (item) =>
                    `${item?.name}, ${item?.childrenList
                        ?.map((item_) => `${item_?.name}, ${item_?.childrenList?.map((_item) => `${_item?.name}`).join(", ")}`)
                        .join(", ")}`,
            )
            .join(", ")

        if (categoryRootList.length) {
            return {
                title: `SFB - Каталог`,
                description,
                openGraph: {
                    title: `SFB - Каталог`,
                    description,
                    type: "website",
                    determiner: "auto",
                },
            }
        } else {
            return {
                title: `SFB - Каталог`,
                description: "SFB - Каталог",
            }
        }
    } catch (e) {
        console.log("catch error market")

        return {
            title: `SFB - Каталог`,
            description: "SFB - Каталог",
        }
    }
}

export default function Market() {
    return (
        <div className={styles.wrapper}>
            <section>
                <SearchBar />
                <CatalogMain />
            </section>
        </div>
    )
}
