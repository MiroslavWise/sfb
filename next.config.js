/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_DOMAINS],
    },
    swcMinify: true,
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
