import React, { useState, useEffect } from "react";
import { calcTimeDifferent } from "./calcTimeDifferent";

const CountDown = ({ date }: { date: Date }) => {
    const [timeInMs, setTimeInMs] = useState(date.getTime());
    const [remainingTime, setRemainingTime] = useState<{
        seconds: string;
        minutes: string;
        hours: string;
        days: string;
    }>();

    useEffect(() => {
        setTimeInMs(date.getTime());
    }, [date]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateRemainingTime(timeInMs);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeInMs]);

    const updateRemainingTime = (timeInMs: number) => {
        setRemainingTime(calcTimeDifferent(timeInMs));
    };
   
    return (
        <div className="flex items-center gap-2 sm:mt-2">
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.hours.slice(0, 1)}
            </span>
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.hours.slice(1, 2)}
            </span>
            <b className="text-xl">:</b>
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.minutes.slice(0, 1)}
            </span>
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.minutes.slice(1, 2)}
            </span>
            <b className="text-xl">:</b>
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.seconds.slice(0, 1)}
            </span>
            <span className="bg-black text-white p-1 rounded-md text-3xl sm:text-xl">
                {remainingTime?.seconds.slice(1, 2)}
            </span>
        </div>
    );
};

export default CountDown;
