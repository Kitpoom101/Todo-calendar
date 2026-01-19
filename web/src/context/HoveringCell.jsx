import { createContext, useContext, useState } from "react";

const HoverContext = createContext(null);
    
export const HoveringCell = ({children}) => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [activeCell, setActiveCell] = useState(null);

    return(
        <HoverContext.Provider value={{hoveredCell, setHoveredCell, activeCell, setActiveCell}}>
            {children}
        </HoverContext.Provider>
    )
}

export function useHover(){
    return useContext(HoverContext);
}
