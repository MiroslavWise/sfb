import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"

import type { IChildrenProps } from "@/types/types"

// import { Footer } from "@/components/layout/footer"
// import { Header } from "@/components/layout/header"

const Provider = dynamic(() => import("@/context/provider"), { ssr: false })

import { cx } from "@/helpers/lib/cx"

import "@/scss/init.scss"
import "@gravity-ui/uikit/styles/fonts.css"
import "@gravity-ui/uikit/styles/styles.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SFB",
}

export default function RootLayout({ children }: IChildrenProps) {
    return (
        <html lang="ru">
            <body className={cx(inter.className)}>
                <Provider>
                    {/* <Header /> */}
                    {children}
                    {/* <Footer /> */}
                </Provider>
            </body>
        </html>
    )
}
