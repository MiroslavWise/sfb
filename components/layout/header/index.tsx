import { Logo } from "./components/Logo"
import { Navigation } from "./components/Navigation"

import styles from "./styles/style.module.scss"

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <Navigation />
        </header>
    )
}
