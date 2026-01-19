const AddTodo = ({onClose}) => {

    return(
        <div className="bg-white h-7/10 w-1/2 z-30 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex align-middle items-center  h-full ">
                <p className="">Description <input type="text" className="border "/></p>
            </div>
        </div>
    )
}

export default AddTodo;