"use client"

import { usePush } from "@/helpers/hooks/usePush"
import { ITEMS_ASIDE_LEFT } from "../constants/ITEMS-ASIDE-LEFT"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ComponentCarouselBannerMainPage } from "@/components/pages/main"

export const LeftAsideUser = () => {
    const pathname = usePathname()
    const { handlePush } = usePush()

    return (
        <aside>
            <ul data-links>
                {ITEMS_ASIDE_LEFT({}).map((item) => (
                    <li
                        key={`${item.value}-profile-link`}
                        onClick={() => handlePush(item.value)}
                        data-active={pathname.includes(item.value)}
                    >
                        <Image
                            src={item.icon}
                            alt={item.icon}
                            width={22}
                            height={22}
                        />
                        <p>{item.label}</p>
                        {item.count ? (
                            <div data-count>
                                <span>{item.count}</span>
                            </div>
                        ) : null}
                    </li>
                ))}
            </ul>
            <ComponentCarouselBannerMainPage type="aside" />
        </aside>
    )
}
