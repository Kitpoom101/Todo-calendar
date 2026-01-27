import { useState, useEffect, useRef } from "react"
import AddTodo from "./AddTodo";
import { useHover } from "../context/HoveringCell";
import { AnimatePresence, motion, spring } from "framer-motion";
import Calendar from "./Calendar";

const Layout = ({ children }) => {
    const [openAdd, setOpenAdd] = useState(false);
    const { activeCell, setActiveCell } = useHover();
    const [monthIndex, setMonthIndex] = useState(0);
    const [direction, setDirection] = useState(-1);
    const [cellDate, setCellDate] = useState("Null");


    // here is to change bg color to match hovered cell
    
    const hoverWeekDayBg = {
        Sun: "#fecaca",
        Mon: "#fef9c3",
        Tue: "#fbcfe8",
        Wed: "#bbf7d0",
        Thu: "#fed7aa",
        Fri: "#bfdbfe",
        Sat: "#e9d5ff",
    };

    function changeBG(weekday){
        return hoverWeekDayBg[weekday]??"#adb6c4";
    }

    function handleOnCellClick(date){
        setCellDate(date); // pass the clicked date
        setOpenAdd(true); // open todo
    }

    function handleOnClose(){
        setOpenAdd(false)
        setActiveCell(null);
    }

    function handleButtonClicked(direction){
        setDirection(direction)
        setMonthIndex(prev => prev + direction); 
    }

return (
    <div className={`h-screen justify-center transition-colors duration-200 ease-in`} style={{backgroundColor: changeBG(activeCell)}}>
        {/* calendar */}
        <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div 
        className="z-10 w-screen"
        key={monthIndex}
        custom={direction}
        animate={{
            x:"0%",
            transition: { 
                duration: 0.5,
                ease: "easeInOut"
            }
        }}
        initial={{
            x: direction > 0 ? "100%" : "-100%",
        }}
        exit={{
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            transition:{duration: 0.3}
        }}
        >
            <Calendar monthIndex={monthIndex} onClick={handleOnCellClick} setMonthIndex={setMonthIndex}></Calendar>
        </motion.div>
        {/* add form and button */}
        <div className="flex fixed top-0 py-2 z-20 ">
            {/* left */}
            <button 
            className="bg-white fixed left-0 rounded-xl w-24 h-14 hover:bg-slate-100 transition-colors duration-200 flex justify-center items-center" 
            onClick={() => {handleButtonClicked(-1)}}>
                <svg 
                stroke="currentColor" 
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 16 16" 
                height="2em"
                width="2em" 
                xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd">
                    </path>
                </svg>
            </button>
            {/* right */}
            <button 
            className="bg-white fixed right-0 rounded-xl w-24 h-14 hover:bg-slate-100 transition-colors duration-200 flex justify-center items-center" 
            onClick={() => {handleButtonClicked(1)}}>
                <svg 
                stroke="currentColor" 
                fill="currentColor" 
                stroke-width="0" 
                viewBox="0 0 16 16" 
                height="2em" width="2em" 
                xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z" clip-rule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
        </AnimatePresence>
        
        <AnimatePresence>
        {openAdd && (
            <AddTodo date={cellDate} onClose={handleOnClose} />
        )}
        </AnimatePresence>
    </div>
    )
}
    


export default Layout