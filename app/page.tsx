import {
    ComponentCarouselMainPage,
    // ComponentBackGroundVideoMainPage,
    ComponentCarouselBannerMainPage,
    ComponentMainUseFormMainPage,
} from "@/components/pages/main"
import Exchange from "./exchange/page"

import styles from "./page.module.scss"

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <ComponentMainUseFormMainPage />
            <ComponentCarouselBannerMainPage type="main" />
            {/* <ComponentBackGroundVideoMainPage /> */}
            <Exchange />
            <ComponentCarouselMainPage />
        </div>
    )
}
