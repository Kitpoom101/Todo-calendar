import type React from "react"

interface TodoCardProps{
    date: Date;
    data: string;
}
const TodoCard: React.FC<TodoCardProps> = ({ date, data }) => {

    return(
        <>
            <div>
                {date.toLocaleDateString()} --{'>'} {data}
            </div>
        </>
    )
}

export default TodoCard;