import { useState } from "react"
import AddTodo from "./AddTodo";

const Layout = ({ children }) => {
    const [openAdd, setOpenAdd] = useState(false);
return (
    // container
    <div className="h-screen justify-center ">
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
        {openAdd && (
            <AddTodo onClose={() => setOpenAdd(false)}></AddTodo>
        )}
    </div>
)
}
    


export default Layout