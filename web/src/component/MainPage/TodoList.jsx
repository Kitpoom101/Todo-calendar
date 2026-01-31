
const TodoList = ({ todo }) => {

    return(
        <div className="w-5/6 h-28 bg-white rounded-3xl border-2 p-3 my-1">
            {todo.title}
        </div>
    )
}

export default TodoList;