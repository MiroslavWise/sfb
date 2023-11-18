import {
    ComponentCarouselMainPage,
    ComponentCarouselBannerMainPage,
    ComponentMainUseFormMainPage,
} from "@/components/pages/main"
import Market from "./market/page"

import styles from "./page.module.scss"

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <ComponentMainUseFormMainPage />
            <ComponentCarouselBannerMainPage type="main" />
            <Market />
            <ComponentCarouselMainPage />
        </div>
    )
}
