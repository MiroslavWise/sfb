import dynamic from "next/dynamic"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import type { IChildrenProps } from "@/types/types"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

import StyledComponentsRegistry from "@/helpers/lib/AntdRegistry"
const Provider = dynamic(() => import("@/context/provider"), { ssr: false })

import { cx } from "@/helpers/lib/cx"

import "@/scss/init.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SFB",
}

export default function RootLayout({ children }: IChildrenProps) {
    return (
        <html lang="ru">
            <body className={cx(inter.className)}>
                <StyledComponentsRegistry>
                    <Provider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </Provider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
