import { VipTop, ComponentMainUseFormMainPage, ComponentCarouselBannerMainPage } from "@/components/pages/main"

import styles from "./page.module.scss"

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <ComponentMainUseFormMainPage />
            <ComponentCarouselBannerMainPage type="main" />
            <VipTop />
        </div>
    )
}
