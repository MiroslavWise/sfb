import type { TTagAmount } from "./types"

import styles from "./style.module.scss"

export const TagAmount: TTagAmount = ({ count }) => {
    const countTitle = countName(count)

    return (
        <div className={styles.container}>
            <p>
                Количетво:{" "}
                <span>{countTitle ? `${count} ${countTitle}` : "Нет"}</span>{" "}
            </p>
        </div>
    )
}

const countName = (count: number) => {
    if (!count) {
        return null
    }
    if (
        (count >= 5 && count <= 20) ||
        ["6", "7", "8", "9", "0"].includes(count?.toString().at(-1)!) ||
        count.toString().at(-2) === "1"
    ) {
        return "штук"
    }
    if (count?.toString().at(-1) === "1") {
        return "штукa"
    }
    if (["2", "3", "4"].includes(count?.toString().at(-1)!)) {
        return "штуки"
    }
}
