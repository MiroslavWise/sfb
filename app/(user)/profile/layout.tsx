import type { IChildrenProps } from "@/types/types"

import { DataProfile } from "@/components/pages/profile/components/DataProfile"

export default function LayoutProfile({ children }: IChildrenProps) {
    return (
        <section data-profile>
            <DataProfile />
            {children}
        </section>
    )
}
