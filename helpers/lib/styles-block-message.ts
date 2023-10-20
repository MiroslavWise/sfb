type TReturnTypeStyle = "only" | "end" | "middle" | "start"

export function stylesBlockRight(
    length: number,
    index: number,
): TReturnTypeStyle {
    if (length === 1) {
        return "only"
    }

    if (index === length - 1) {
        return "end"
    }

    if (length > 1 && index === 0) {
        return "start"
    }

    return "middle"
}
