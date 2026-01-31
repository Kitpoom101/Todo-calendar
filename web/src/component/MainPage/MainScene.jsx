import TodoCalendarTitle from "@/assets/_TODO-Calendar_(7).svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataHook from "../../hooks/getDataHook";
import TodoList from "./TodoList";

const MainScene = ({onOpenCalendar}) => {
    const { data: todos, loading, error } = DataHook();

    useEffect(() => {
        const img = new Image();
        img.src = TodoCalendarTitle;

    }, [])

    return(
        <div className="bg-sky-50">
        <motion.div className="h-screen w-screen" 
        initial={{
            opacity: 0,
            y: "100vh",
        }}
        animate={{
            opacity: 1,
            y: "0",
        }}
        exit={{
            opacity: "0%",
            y: "100vh",
            transition:{duration: 0.2,},
        }}
        >
            {/* title */}
            <div className="font-bold text-6xl font-sans text-center h-1/3 flex justify-center items-center flex-col">
                <img src={TodoCalendarTitle} className="select-none w-2/3 h-fit hover:bg-amber-50 p-5 rounded-2xl" alt="Todo Calendar" />
            </div>
            {/* search */}
            <div className="w-full h-16 flex justify-center items-center">
                <div className="w-5/6 h-fit relative ">
                    <input type="text" placeholder="Search..." className="w-full rounded-4xl bg-white border-2 p-4" />
                    <svg className="absolute right-8 top-1/2 -translate-y-1/2 hover:text-green-500 transition-colors duration-150"
                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
                    </svg>
                </div>
            </div>
            {/* todo list */}
            <div className="relative bg-amber-50 w-screen flex flex-col justify-center items-center mt-10">
                {todos?.map((todo) => (
                    <TodoList key={todo.id} todo={todo}></TodoList> 
                ))}
            </div>
            {/* to calendar */}
            <div className="fixed bottom-5 right-5">
                <div className="flex group w-56 bg-white rounded-xl shadow-md p-4 transition-transform duration-300 hover:-translate-y-2 text-center justify-center items-center cursor-pointer"
                    onClick={onOpenCalendar}>
                    <h3 className="font-semibold group-hover:text-sky-400 transition-colors duration-200 select-none ">
                        Plan your DAYS
                        <svg className="inline ml-3 -translate-y-0.5" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 11H9V13H7zM7 15H9V17H7zM11 11H13V13H11zM11 15H13V17H11zM15 11H17V13H15zM15 15H17V17H15z"></path><path d="M5,22h14c1.103,0,2-0.897,2-2V8V6c0-1.103-0.897-2-2-2h-2V2h-2v2H9V2H7v2H5C3.897,4,3,4.897,3,6v2v12 C3,21.103,3.897,22,5,22z M19,8l0.001,12H5V8H19z"></path>
                        </svg>
                    </h3> 
                </div>
            </div>
        </motion.div>
        </div>
    )
}

export default MainScene;