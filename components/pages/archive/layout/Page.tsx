import { queryProductListMeArchive } from "@/apollo/query"
import { useQuery } from "@apollo/client"
import { useMemo } from "react"
import { ItemProduct } from "../../my-product/components/ItemProduct"

export const PageArchive = () => {
    const { data } = useQuery(queryProductListMeArchive, {
        variables: {
            offset: 0,
        },
    })

    const list = useMemo(() => {
        return (data?.productListMe?.results as any[]) || []
    }, [data])

    return (
        <ul>
            {list.map((item) => (
                <ItemProduct key={`${item?.id}-archive`} {...item} />
            ))}
        </ul>
    )
}
