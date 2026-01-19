import { motion } from "framer-motion";
import { useHover } from "../context/HoveringCell";
import { useEffect } from "react";

const CalendarCell = ({cell, today}) => {
    const { hoveredCell, setHoveredCell, activeCell, setActiveCell } = useHover();
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

    useEffect(() => {
        console.log(activeCell)
    }, [activeCell])

    return (
    <motion.div 
        initial={{ 
            backgroundColor: "#ffffff",
            scale: 0,
         }}
         animate={{
            scale: 1,
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
        className={`${cell.day==today && cell.monthType=="present" ? "bg-slate-200":""}  
        p-4 border flex flex-col items-center justify-center `}
        onClick={() => setActiveCell(`${cell.weekday}`)}
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