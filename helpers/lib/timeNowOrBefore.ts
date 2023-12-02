import dayjs from "dayjs"

export function timeNowOrBeforeChat(time: Date | string): string | null {
    if (!time) return null
    if (time) {
        return dayjs(time).format("HH:mm")
    }
    return null
}
