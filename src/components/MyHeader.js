const MyHeader = ({headText, leftChild, rightChild}) => {
    return (
        <header className="d-flex justify-center items-center fiex-wrap my-4">
                <div>
                    {leftChild}
                </div>
                <h1 className="mx-36 text-3xl text-center font-bold">
                    {headText}
                </h1>
                <div>
                    {rightChild}
                </div>
        </header>
    )
}

export default MyHeader;