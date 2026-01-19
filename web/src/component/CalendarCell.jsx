import { motion } from "framer-motion";

const CalendarCell = ({cell, i, today}) => {

    const hoverWeekDayBg = {
        Sun: "#fecaca",
        Mon: "#fef9c3",
        Tue: "#fbcfe8",
        Wed: "#bbf7d0",
        Thu: "#fed7aa",
        Fri: "#bfdbfe",
        Sat: "#e9d5ff",
    };

    return (
    <motion.div 
        initial={{ backgroundColor: "#ffffff" }}
        whileHover={{
            // Hover in
            backgroundColor: hoverWeekDayBg[cell.weekday],
            transition: { duration: 0.1, ease: "easeOut" },
        }}
        transition={{
            // Hover out
            duration: 0.3,
            ease: "easeIn"
        }}
        key={i} 
        className={`${cell.day==today && cell.monthType=="present" ? "bg-slate-200":""}  
            p-4 border flex flex-col items-center justify-center `}
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