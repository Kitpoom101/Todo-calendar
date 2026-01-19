import { useState, useEffect } from "react"
import AddTodo from "./AddTodo";
import { useHover } from "../context/HoveringCell";
import { AnimatePresence, motion } from "framer-motion";

const Layout = ({ children }) => {
    const [openAdd, setOpenAdd] = useState(false);
    const { activeCell } = useHover();
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

return (
    <div className={`h-screen justify-center`} style={{backgroundColor: changeBG(activeCell)}}>
        {/* calendar */}
        <div className="z-10 w-screen">
            {children}
        </div>
        {/* add form and button */}
        <div className="flex fixed bottom-10 right-10 z-20">
            <button 
            className="bg-white rounded-full w-16 h-16 hover:bg-slate-100 transition-colors duration-200" 
            onClick={() => setOpenAdd(!openAdd)}>
                +
            </button>
        </div>
        <AnimatePresence>
        {openAdd && (
            <AddTodo onClose={() => setOpenAdd(false)} />
        )}
        </AnimatePresence>
    </div>
    )
}
    


export default Layout