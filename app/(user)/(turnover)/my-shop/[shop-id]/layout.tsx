import { IChildrenProps } from "@/types/types"

import { HeaderShopId, NavigationLayout } from "@/components/pages/shop"

import styles from "./layout.module.scss"

export default function LayoutShop({ children, params }: IChildrenProps & { params: { ["shop-id"]: string } }) {
    return (
        <div className={styles.wrapper}>
            <HeaderShopId id={params["shop-id"]} />
            <NavigationLayout shopId={params["shop-id"]!} />
            {children}
        </div>
    )
}
