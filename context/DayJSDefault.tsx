import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import isLeapYear from "dayjs/plugin/isLeapYear"
import "dayjs/locale/ru"

dayjs.extend(isLeapYear)
dayjs.locale("ru")
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale("ru", {
    relativeTime: {
        future: "через %s",
        past: "%s назад",
        s: "несколько секунд",
        m: "минута",
        mm: "%d минут",
        h: "час назад",
        hh: "%d часов",
        d: "день",
        dd: "%d дней",
        M: "месяц",
        MM: "%d месяцев",
        y: "около года",
        yy: "%d лет",
    },
})

export default dayjs
