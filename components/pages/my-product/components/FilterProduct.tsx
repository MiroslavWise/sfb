import { Filter } from "@/components/common/filters"

import { useOrderingProduct } from "@/store/state/useOrderingProduct"

export const FilterProduct = () => {
    const price = useOrderingProduct(({ price }) => price)
    const dispatchPrice = useOrderingProduct(
        ({ dispatchPrice }) => dispatchPrice,
    )

    function handleDispatchPrice() {
        dispatchPrice()
    }

    return (
        <>
            <Filter
                typePrice={price === "price," ? true : false}
                dispatchPrice={handleDispatchPrice}
            />
        </>
    )
}
