import { IChildrenProps } from "@/types/types"

import { HeaderLayoutPublicShopId, NavigationLayoutPublic } from "@/components/pages/shop"

import styles from "./layout.module.scss"

export default function LayoutShopId({ children, params }: IChildrenProps & { params: { ["shop-id"]: string } }) {
    return (
        <div className={styles.wrapper}>
            <HeaderLayoutPublicShopId />
            <NavigationLayoutPublic shopId={params["shop-id"]} />
            {children}
        </div>
    )
}
