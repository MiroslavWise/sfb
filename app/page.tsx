import { VipTop, ComponentMainUseFormMainPage, ComponentCarouselBannerMainPage } from "@/components/pages/main"

import "./page.scss"

export default function Page() {
    return (
        <div className="__main-page-wrapper__">
            <ComponentMainUseFormMainPage />
            <ComponentCarouselBannerMainPage type="main" />
            <VipTop />
        </div>
    )
}
