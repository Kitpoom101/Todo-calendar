import { motion } from "framer-motion";
import { useHover } from "../context/HoveringCell";
import { useEffect, useState } from "react";

const CalendarCell = ({cell, today, onClick}) => {
    const { hoveredCell, setHoveredCell, activeCell, setActiveCell } = useHover();
    const thisMonth = new Date();

    // here is to check hover cell

    const hoverWeekDayBg = {
        Sun: "#fecaca",
        Mon: "#fef9c3",
        Tue: "#fbcfe8",
        Wed: "#bbf7d0",
        Thu: "#fed7aa",
        Fri: "#bfdbfe",
        Sat: "#e9d5ff",
    };

    function clickMethod(){
        setActiveCell(`${cell.weekday}`);
        onClick(cell)// send data to AddTodo
        // console.log(cell.day + "+" + cell.month)
        // console.log(today + "+" + (thisMonth.getMonth()+1))
    }

    return (
    <motion.div 
        initial={{ 
            opacity: 0,
         }}
         animate={{
            opacity: 1,
         }}
        whileHover={{
            // Hover in
            backgroundColor: hoverWeekDayBg[cell.weekday],
            transition: { duration: 0.1, ease: "easeOut" },
        }}
        transition={{
            // Hover out
            duration: 0.5,
            ease: "easeIn"
        }}
        className={`${cell.day==today && cell.month==(thisMonth.getMonth() + 1) ? "bg-slate-200":"bg-white"}  
        p-4 border flex flex-col items-center justify-center `}
        onClick={() => clickMethod()}
    >
        {/* inside div */}
        <div 
        className={
            `${cell.monthType=="present" ? "font-bold" : "font-light"}`}
            >
            {cell.day}
        </div>
    </motion.div>
    )
}

export default CalendarCell;