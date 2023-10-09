import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/scss/init.scss"

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
            <body className={inter.className}>{children}</body>
        </html>
    )
}
