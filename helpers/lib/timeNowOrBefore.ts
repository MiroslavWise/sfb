import dayjs from "dayjs"

const FORMAT_DAY = "YYYY-MM-DD"

export function timeNowOrBeforeChat(time: Date | string): string | null {
    if (!time) return null
    if (time) {
        return dayjs(time).format("HH:mm")
    }
    return null
}
