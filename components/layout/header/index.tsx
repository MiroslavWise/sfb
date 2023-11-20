import { memo } from "react"
import { Logo } from "./components/Logo"
import { Navigation } from "./components/Navigation"
import { SearchBlock } from "./components/SearchBlock"

import styles from "./styles/style.module.scss"

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <SearchBlock />
            <Navigation />
        </header>
    )
}
