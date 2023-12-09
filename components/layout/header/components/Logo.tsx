import Link from "next/link"

export const Logo = () => (
    <Link href={"/"} data-logo>
        <img src="/svg/logo.svg" alt="logo" width={54} height={25} />
    </Link>
)
