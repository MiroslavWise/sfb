import { ItemLinkProfile, ButtonOut } from "@/components/pages/profile"

import { ITEMS_PROFILE } from "./constants"

export default function Profile() {
    return (
        <ul data-link-profile>
            {ITEMS_PROFILE.map((item) => (
                <ItemLinkProfile key={`${item.value}-link-profile`} {...item} />
            ))}
            <footer>
                <ButtonOut />
            </footer>
        </ul>
    )
}
