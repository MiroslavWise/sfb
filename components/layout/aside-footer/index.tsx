import { MENU_AUTH } from "./constants"
import { usePathname } from "next/navigation"
import { useAuth } from "@/store/state/useAuth"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./style.module.scss"
import { Button } from "@/components/common"
import { useEnter } from "@/store/state/useEnter"

export const AsideFooter = ({ compact }: { compact: boolean }) => {
    const { token } = useAuth()
    const { dispatch } = useEnter()
    const { handlePush } = usePush()
    const pathname = usePathname()

    return token ? (
        <ul className={styles.container} data-compact={compact}>
            {MENU_AUTH.map((item) => (
                <li
                    key={`${item.path}-footer`}
                    onClick={() => handlePush(item.path)}
                    data-active={pathname.includes(item.path)}
                    style={{
                        marginTop: ["/profile", "/notifications"].includes(
                            item.path,
                        )
                            ? 8
                            : 0,
                    }}
                >
                    <div data-icon>{item.icon}</div>
                    {!compact && <p>{item.label}</p>}
                </li>
            ))}
        </ul>
    ) : (
        <Button
            label="Войти"
            onClick={() => {
                dispatch({ visible: true })
            }}
        />
    )
}
