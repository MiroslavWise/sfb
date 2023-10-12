import Image from "next/image"
import styles from "../styles/background-video.module.scss"

export const ComponentBackGroundVideoMainPage = () => {
    return (
        <div className={styles.wrapper}>
            <Image
                src="/png/bg.png"
                alt="main-bg"
                width={1440}
                height={500}
                unoptimized
            />
            <div data-bg-blur />
            <section data-title-description>
                <h1>Как работает SFB</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </section>
        </div>
    )
}
