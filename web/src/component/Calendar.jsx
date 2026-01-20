import { useState, useEffect } from "react";
import { easeIn, motion, scale } from "framer-motion";
import CalendarCell from "./CalendarCell";
import { HoveringCell } from "../context/HoveringCell";


const Calendar = ({monthIndex, onClick}) => {
    const [date, setDate] = useState(new Date());// month/day/year for today
    
    const today = date.getDate();// get day(0-31)
    const year = date.getFullYear();// get year
    const month = date.getMonth() + monthIndex;// get month( 0 - 11 ) + monthIndex
    const displayDate = new Date(year, month);// when monthIndex change this change
    const daysInMonth = new Date(year, month + 1, 0).getDate()// get last day of prev month
    const lastMonthDays = new Date(year, month, 0).getDate()
    const weekDaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];// array of weekDay

    
    // 1. What day does the month start on (0=Sun, 1=Mon, ... 6=Sat)
    const firstDayIndex = new Date(year, month, 1).getDay()

    // 2. Generate an array of cells
    const calendarCells = []

    // cells before the first day
    // last month
    for (let i = 0; i < firstDayIndex; i++) {
        const dayDate = new Date(year, month - 1, lastMonthDays - i)
        const weekdayName = dayDate.toLocaleDateString("en-US", { weekday: "short" })
        calendarCells.unshift({
            day: lastMonthDays - i,
            month: month==0?12:month ,
            year: month==0?year-1:year,
            weekday: weekdayName,
        }) // days
    }

    // fill actual days
    // calendar cell type
    for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month, d)
    const weekdayName = dayDate.toLocaleDateString("en-US", { weekday: "short" })
    calendarCells.push({
        day: d,
        month: month + 1,
        year: year,
        weekday: weekdayName,
        date: dayDate,
    })
    }

    // for each weekday
    const weekDayBg = {
        Sun: "bg-red-400",
        Mon: "bg-yellow-400",
        Tue: "bg-pink-400",
        Wed: "bg-green-400",
        Thu: "bg-orange-400",
        Fri: "bg-blue-400",
        Sat: "bg-purple-400",
    };


    function checkWeekDay(weekday) {
        return weekDayBg[weekday] ?? "bg-gray-300";
    }

    // detect day change at 00:00
    function onDayChange(callback){
        const now = new Date();
        const nextMidnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        )

        const msUntilMidnight = nextMidnight - now;
        console.log(msUntilMidnight);

        // check midnight
        return setTimeout(() => {
            callback();
            onDayChange(callback);
        }, msUntilMidnight);
    }

    // start once
    useEffect(() => {
        const timer = onDayChange(() => {
            console.log("Day changed");
            setDate(new Date());
        });

        return () => clearTimeout(timer);
    }, []);

    // main jsx
    return(
        <div key={`${month}-${year}`} className="h-screen font-mono">
            <div className="flex justify-center font-bold text-2xl py-5 ">
                {displayDate.toLocaleDateString("en-US", {month: "long"})}  : {displayDate.getFullYear()}
            </div>
            <div className="h-3/4">
                <div className="grid grid-cols-7 w-full text-center font-bold my-3">
                    {weekDaysList.map((weekday => (
                        <div key={weekday} className={`${checkWeekDay(weekday)} py-3`}>
                        {weekday}
                        </div>
                    )))}
                </div>
                
                <div className="grid grid-cols-7 w-full text-center h-full">
                    {calendarCells.map((cell, i) =>
                        cell ? (
                        // container
                        <CalendarCell key={`${year}-${cell.month}-${cell.day}`} cell={cell} today={today} onClick={onClick}></CalendarCell>
                        ) : (
                        <div key={i} className="p-4 border bg-gray-100"></div> // empty cell
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar;