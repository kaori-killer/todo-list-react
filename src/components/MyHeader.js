const MyHeader = ({headText, leftChild, rightChild}) => {
    return (
        <header className="d-flex justify-center items-center fiex-wrap my-4">
            <button id="day-decrease-button" className="btn bg-white shadow mx-1">
                {leftChild}
            </button>
                <a href="/" className="text-black">
                    <h1 id="todo-date" className="mx-36 text-3xl text-center font-bold">
                        {headText}
                    </h1>
                </a>
            <button id="day-increase-button" className="btn bg-white shadow mx-1">
                {rightChild}
            </button>
        </header>
    )
}

export default MyHeader;