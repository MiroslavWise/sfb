import { ImageResponse } from "next/og"

export const runtime = "edge"

export const contentType = "image/svg"

export const size = {
    width: 32,
    height: 32,
}

export default function Icon() {
    return new ImageResponse(<img src="/icon.svg" sizes="32x32" />, { ...size })
}
