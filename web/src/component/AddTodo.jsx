import { AnimatePresence, easeOut, motion } from "framer-motion";
import { useHover } from "../context/HoveringCell";
import useInputHook from "../hooks/useInputHook";
import { useState } from "react";


const AddTodo = ({onClose, date}) => {
    const { activeCell, setActiveCell } = useHover();
    const [title, setTitle] = useState("");
    const { createInput, loading, error } = useInputHook();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        // close first before sending data back for better ux
        onClose();
        console.log("Submitting:", title);

        
        await createInput(title, (date.day + "/" + date.month + "/" + date.year));
        setTitle("");
    };

    const hoverWeekDayBg = {
        Sun: "bg-[#fecaca]",
        Mon: "bg-[#fef9c3]",
        Tue: "bg-[#fbcfe8]",
        Wed: "bg-[#bbf7d0]",
        Thu: "bg-[#fed7aa]",
        Fri: "bg-[#bfdbfe]",
        Sat: "bg-[#e9d5ff]",
    };

    function changeBG(weekday){
        return hoverWeekDayBg[weekday]??"#adb6c4";
    }

    return(
        <>
        <motion.div 
            className="fixed top-0 w-screen h-screen bg-amber-50/30 backdrop-blur-sm z-0" onClick={onClose}
            initial={{x: "100%", }}
            animate={{x: "0%", transition: {duration: 0.2, ease: "easeIn"},}}
            exit={{x: "-100%", }}
        >
        </motion.div>
        <motion.div
            className="bg-slate-400 h-7/10 w-1/2 z-30 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            exit={{ 
                opacity: 0,
                scale: 0
                }}
            initial={{ 
                opacity: 0,
                scale: 0,
                transition: {duration: 0.3, ease: "easeIn"}
                }}
            animate={{ 
                opacity: 1,
                scale: 1,
                transition: {duration: 0.3, ease: "easeOut"},
                }}
        >
            <div className="flex flex-col items-center h-full ">
                {/* top part */}
                <div className="fixed top-4 right-8 font-bold hover:text-red-600 text-2xl" onClick={onClose}> 
                    <svg stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path fill="red" stroke="#currentColor" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                    </svg>   
                </div>
                <div className="bg-amber-50 w-full flex items-center justify-center font-bold text-2xl h-24 ">
                    <h1>{date.day} / {date.month} / {date.year}</h1>
                </div>
                {/* user interact part */}
                <form onSubmit={handleSubmit}>
                    <p className="bg-amber-100">
                        Description 
                        <input className="border" type="text" placeholder="Whats on your mind" value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </p>
                    <div className={`fixed bottom-4 right-8 border-2  px-4 py-2 rounded-xl ${changeBG(activeCell)} hover:brightness-110`}>
                        <button className="font-mono" type="submit">
                            Enter!
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
        </>
        
    )
}

export default AddTodo;