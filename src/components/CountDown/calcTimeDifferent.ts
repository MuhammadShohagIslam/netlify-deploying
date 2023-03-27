import dayjs from "dayjs";

export const calcTimeDifferent = (timeInMs: number) => {
    const timeStampDayjs = dayjs(timeInMs);
    const nowDayjs = dayjs();
    if (timeStampDayjs.isBefore(nowDayjs)) {
        return {
            seconds: "00",
            minutes: "00",
            hours: "00",
            days: "00",
        };
    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timeStampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timeStampDayjs),
        hours: getRemainingHours(nowDayjs, timeStampDayjs),
        days: getRemainingDays(nowDayjs, timeStampDayjs),
    };
};

function getRemainingSeconds(
    nowDayjs: dayjs.Dayjs,
    timeStampDayjs: dayjs.Dayjs
) {
    const seconds = timeStampDayjs.diff(nowDayjs, "seconds") % 60;
    return paidWithZeros(seconds, 2);
}
function getRemainingMinutes(
    nowDayjs: dayjs.Dayjs,
    timeStampDayjs: dayjs.Dayjs
) {
    const minutes = timeStampDayjs.diff(nowDayjs, "minutes") % 60;
    return paidWithZeros(minutes, 2);
}
function getRemainingHours(nowDayjs: dayjs.Dayjs, timeStampDayjs: dayjs.Dayjs) {
    const hours = timeStampDayjs.diff(nowDayjs, "hours") % 60;
    return paidWithZeros(hours, 2);
}
function getRemainingDays(nowDayjs: dayjs.Dayjs, timeStampDayjs: dayjs.Dayjs) {
    const days = timeStampDayjs.diff(nowDayjs, "days");
    return days.toString();
}

function paidWithZeros(number: number, length: number) {
    const numberString = number.toString();
    if (numberString.length >= length) return numberString;
    return "0".repeat(length - numberString.length) + numberString;
}
