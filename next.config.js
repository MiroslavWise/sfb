/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_DOMAINS],
    },
}

module.exports = nextConfig
