import { Logo } from "./components/Logo"
import { Navigation } from "./components/Navigation"
import { SearchBlock } from "./components/SearchBlock"
import { NavigateMenuOther } from "./components/NavigateMenuOther"

import styles from "./styles/style.module.scss"

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav data-header>
                <NavigateMenuOther />
            </nav>
            <nav data-footer>
                <Logo />
                <SearchBlock />
                <Navigation />
            </nav>
        </header>
    )
}
