import type { IChildrenProps } from "@/types/types"

import { LeftAsideUser } from "@/components/layout/user/components/LeftAsideUser"

import "./layout.scss"

export default function Layout({ children }: IChildrenProps) {
    return (
        <section className="__turnover-wrapper__">
            <LeftAsideUser />
            {children}
        </section>
    )
}
