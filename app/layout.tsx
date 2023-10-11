import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const Provider = dynamic(() => import("@/context/provider"), { ssr: false })

import "@/scss/init.scss"
import { cx } from "@/helpers/lib/cx"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SFB",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cx(inter.className)}>
                <Provider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Provider>
            </body>
        </html>
    )
}
