import type { IChildrenProps } from "@/types/types"

import { AsideProfile } from "@/components/pages/profile"

export default function LayoutProfile({ children }: IChildrenProps) {
    return (
        <div data-profile>
            <AsideProfile />
            {children}
        </div>
    )
}
