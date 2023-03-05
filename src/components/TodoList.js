import { useState, useContext, useRef } from "react";
import { TodoDispatchContext } from "../App";

import MyButton from "./MyButton";
import getStringDate from './../util/date';

const TodoList = ({ todoList }) => {
    
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [date, setDate] = useState(getStringDate(new Date()));
    const [isEdit, setIsEdit] = useState(false);

    const { onCreate } = useContext(TodoDispatchContext);

    const getSortedTodoList = () => {
        const copyList = JSON.parse(JSON.stringify(todoList));
        const sortedList = copyList.sort((a, b)=>parseInt(b.id) - parseInt(a.id));
        return sortedList;
    }

    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if(!isEdit){
            console.log(date)
            onCreate(date, content);
        }
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
                            return(
                            <li key={it.id} className="d-flex items-center py-2">
                                <span className="w-100 pl-2">{it.content}</span>
                                <MyButton 
                                    type={"positive"}
                                    text={"완료"}
                                />
                                <MyButton 
                                    text={"수정"}
                                />
                                {/* {isEdit && <MyButton
                                    type={"negative"}
                                    text={"완료"}
                                />}
                                {isEdit && <MyButton
                                    type={"negative"}
                                    text={"삭제"}
                                />} */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;