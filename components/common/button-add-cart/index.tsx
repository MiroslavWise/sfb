import { forwardRef } from "react"
import { toast } from "react-toastify"
import { useLazyQuery, useMutation } from "@apollo/client"

import type { TTypeButton } from "./types"

import { ICartList } from "@/types/shop"
import { queryCart } from "@/apollo/query-"
import { mutationCartItemAdd } from "@/apollo/mutation"

import styles from "./style.module.scss"

export const ButtonAddCart = forwardRef(function ButtonAddCard(
    props: TTypeButton,
) {
    const { id, int, ...rest } = props ?? {}

    const [da, { refetch, loading: loadingCart }] =
        useLazyQuery<ICartList>(queryCart)
    const [useAdd, { loading }] = useMutation(mutationCartItemAdd, {
        variables: {
            productId: id,
            quantity: int >= 1 ? 1 : int,
        },
    })

    return (
        <div className={styles.container}>
            <button
                {...rest}
                type="button"
                disabled={loading || loadingCart}
                onClick={(event) => {
                    event.stopPropagation()
                    event.preventDefault()
                    useAdd().then((response) => {
                        refetch()
                        toast(`Товар добавлен в корзину!`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    })
                }}
            >
                <img
                    className="animate__animated animate__jello"
                    src="/svg/shopping-cart-01.svg"
                    width={30}
                    height={25}
                />
            </button>
        </div>
    )
})
