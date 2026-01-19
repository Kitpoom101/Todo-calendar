import { AnimatePresence, easeOut, motion } from "framer-motion";

const AddTodo = ({onClose}) => {

    return(
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
            <div className="flex align-middle items-center  h-full ">
                <p className="">Description <input type="text" className="border "/></p>
            </div>
        </motion.div>
    )
}

export default AddTodo;