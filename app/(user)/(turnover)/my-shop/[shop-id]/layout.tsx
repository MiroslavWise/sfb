import { IChildrenProps } from "@/types/types"

import { NavigationLayout } from "@/components/pages/shop"

import styles from "./layout.module.scss"

export default function LayoutShop({ children, params }: IChildrenProps) {
    return (
        <div className={styles.wrapper}>
            <NavigationLayout shopId={params["shop-id"]!} />
            {children}
        </div>
    )
}
