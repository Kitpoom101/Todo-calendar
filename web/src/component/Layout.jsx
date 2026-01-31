import { useState, useEffect, useRef } from "react"
import AddTodo from "./AddTodo";
import { useHover } from "../context/HoveringCell";
import { AnimatePresence, motion, spring } from "framer-motion";
import Calendar from "./Calendar";

const Layout = ({ onOpenMain }) => {
    const [openAdd, setOpenAdd] = useState(false);
    const { activeCell, setActiveCell } = useHover();
    const [monthIndex, setMonthIndex] = useState(0);
    const direction = useRef(1);
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

    // Now it will change at run time ( normally it would store it on initial render (from what i understand) )
    const pageVariants = {
        exit: (dir) => ({
            x: dir > 0 ? "-100%" : "100%",
            opacity: 0,
            transition:{duration: 0.3}
        }),
    };

    function changeBG(weekday){
        return hoverWeekDayBg[weekday]??"var(--color-sky-100)";
    }

    function handleOnCellClick(date){
        setCellDate(date); // pass the clicked date
        setOpenAdd(true); // open todo
    }

    function handleOnClose(){
        setOpenAdd(false)
        setActiveCell(null);
    }

    function handleButtonClicked(dir){
        direction.current = dir;
        setMonthIndex(prev => prev + dir); 
    }

return (
    <div style={{backgroundColor: changeBG(activeCell)}}>
    <motion.div className={`h-screen justify-center transition-colors duration-200 ease-in`} 
    initial={{
        opacity: 0,
    }}
    animate={{
        opacity: 1,
    }}
    exit={{
        opacity: 0,
        transition: {duration: 0.2, },
    }}
    >
        {/* calendar */}
        <AnimatePresence mode="popLayout" custom={direction.current}>
        <motion.div 
        className="z-10 w-screen"
        key={monthIndex}
        custom={direction.current}
        variants={pageVariants}
        animate={{
            x:"0%",
            transition: { 
                duration: 0.5,
                ease: "easeInOut"
            }
        }}
        initial={{
            x: direction.current > 0 ? "100%" : "-100%",
        }}
        exit="exit"
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
        {/* exit to main */}
        <div className="bg-linear-to-t from-white to-transparent hover:from-sky-100 transition-all duration-300 absolute w-full h-15 bottom-0 cursor-pointer "
            onClick={onOpenMain}>
            <div className="flex justify-center items-center h-full flex-col hover:-translate-y-1 hover:text-sky-400 transition-transform duration-300">
                <p>Back to MainPage!</p>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
            </div>
        </div>
    </motion.div>
    </div>
    
    )
}
    


export default Layout