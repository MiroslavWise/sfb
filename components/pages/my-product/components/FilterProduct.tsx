import { Filter } from "@/components/common/filters"

import { useOrderingProduct } from "@/store/state/useOrderingProduct"

export const FilterProduct = () => {
    const { price, dispatchPrice } = useOrderingProduct((_) => ({
        price: _.price,
        dispatchPrice: _.dispatchPrice,
    }))

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
