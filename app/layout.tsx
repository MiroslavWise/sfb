import dynamic from "next/dynamic"
import { Open_Sans } from "next/font/google"
import type { Metadata, Viewport } from "next"

import type { IChildrenProps } from "@/types/types"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

const Provider = dynamic(() => import("@/context/provider"), { ssr: false })

import "@/scss/init.scss"
import "@coreui/coreui/dist/css/coreui.min.css"

const openSans = Open_Sans({ subsets: ["latin"] })

export function generateViewport(): Viewport {
    return {
        width: "device-width",
        initialScale: 1,
        userScalable: false,
        maximumScale: 1,
        minimumScale: 1,
        height: "device-height",
        viewportFit: "cover",
    }
}

export const metadata: Metadata = {
    title: "SFB",
}

export default function RootLayout({ children }: IChildrenProps) {
    return (
        <html lang="ru">
            <body className={openSans.className}>
                <Provider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}
