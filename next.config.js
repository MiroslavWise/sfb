/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    images: {
        domains: [process.env.NEXT_PUBLIC_DOMAINS],
    },
}

module.exports = nextConfig
