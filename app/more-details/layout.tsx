import { IChildrenProps } from "@/types/types"

import { ComponentCarouselBannerMainPage } from "@/components/pages/main"

import styles from "./layout.module.scss"

export default function LayoutMore({ children }: IChildrenProps) {
    return (
        <section className={styles.wrapper}>
            <aside>
                <ComponentCarouselBannerMainPage type="aside" />
            </aside>
            {children}
        </section>
    )
}
