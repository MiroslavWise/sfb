import dayjs from "dayjs"

import { FooterComponentDataHeader } from "./components/data-header"
import { FooterComponentDataInformation } from "./components/data-information"

import styles from "./styles/style.module.scss"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <FooterComponentDataHeader />
            <FooterComponentDataInformation />
            <div data-rights>
                <p>© {dayjs().format("YYYY")} • SFB • All rights reserved</p>
            </div>
        </footer>
    )
}
