import Link from "next/link"

export default function NotFound() {
    return (
        <div className="__not-found__">
            <h3>Эта станица не доступна, или вы не правильный адрес ввели</h3>
            <Link href="/">
                <h4>Вернуться на домашнюю страницу</h4>
            </Link>
        </div>
    )
}
