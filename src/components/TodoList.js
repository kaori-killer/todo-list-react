import { useState, useContext, useRef } from "react";
import { TodoDispatchContext } from "../App";

import MyButton from "./MyButton";

const TodoList = ({ todoList, curDate }) => {
    
    const contentRef = useRef();
    const editContentRef = useRef();
    const [content, setContent] = useState("");

    const { onCreate, onRemove, onEdit, onChangeIsEditStatus, onComplete } = useContext(TodoDispatchContext);

    const getSortedTodoList = () => {
        const copyList = JSON.parse(JSON.stringify(todoList));
        const sortedList = copyList.sort((a, b)=>parseInt(b.id) - parseInt(a.id));
        return sortedList;
    }

    const handleSubmit = () => {
        document.querySelector("#todo-name").value = "";

        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        onCreate(curDate, content);
    }

    const handleRemove = (targetId) => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(targetId);
        }
    }

    const handleOnChangeIsEditStatus = (targetId) => {
        onChangeIsEditStatus(targetId);
    }

    const handleEdit = (targetId) => {
        const newContent = document.querySelector(`#todo-name-${targetId}`).value;
        onEdit(targetId, newContent);
    }

    const handleComplete = (targetId) => {
        onComplete(targetId);
    }

    return (
        <div className="mt-10 d-flex justify-center">
            <div className="wrapper bg-white p-10">
                <div className="heading d-flex justify-between">
                    <h2 id="todo-title" className="mt-1">📝 오늘의 할 일 목록</h2>
                    <span className="mr-2 mt-4 todo-count">총 {todoList.length}개</span>
                </div>
                <form id="todo-form" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="d-flex w-100">
                        <label htmlFor="todo-name" className="todo-label" hidden>
                            할 일
                        </label>
                        <input
                            type="text"
                            id="todo-name"
                            className="input-field"
                            ref={contentRef}
                            placeholder="할 일"
                            autoComplete="off"
                            onChange={(e)=>setContent(e.target.value)}
                        />
                        <MyButton
                            text={"확인"}
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
                <ul className="mt-3 pl-0">
                    {getSortedTodoList().map((it)=>{
                        return (
                            <li key={it.id} className="d-flex items-center py-2">
                            {it.isEdit ? (
                                    <form className="d-flex w-100" onSubmit={(e)=>{e.preventDefault()}}> 
                                        <input
                                            type="text"
                                            id={`todo-name-${it.id}`}
                                            className="input-update-field"
                                            ref={editContentRef}
                                            defaultValue={it.content}
                                            autoComplete="off"
                                        />
                                        <MyButton
                                        type={"positive"}
                                        text={"확인"}
                                        onClick={()=>handleEdit(it.id)}
                                        />
                                        <MyButton
                                        type={"negative"}
                                        text={"삭제"}
                                        onClick={()=>handleRemove(it.id)}
                                        />
                                    </ form>
                                    ) : (             
                                        <>                       
                                            <span className={["w-100", "pl-2", `${it.isComplete ? "completed" : ""}`].join(" ")}>{it.content}</span>
                                            <MyButton 
                                            type={"positive"}
                                            text={"완료"}
                                            onClick={()=>handleComplete(it.id)}
                                            />
                                            <MyButton 
                                            text={"수정"}
                                            onClick={()=>handleOnChangeIsEditStatus(it.id)}
                                            />
                                        </>
                                    )
                                }    
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default TodoList;