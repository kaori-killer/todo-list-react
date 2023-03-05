import { useContext, useState } from 'react'
import { TodoStateContext } from '../App';
import { useEffect } from 'react';

import MyHeader  from '../components/MyHeader';
import MyButton from '../components/MyButton';
import TodoList from '../components/TodoList';

import getStringDate from '../util/date';

const Home = () => {
    const todoList = useContext(TodoStateContext);
    // console.log(todoList);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    useEffect(() => {
        if(todoList.data.length >= 1){
            setData(
                todoList.data.filter((it) => it.date === getStringDate(curDate))
            );
        }
    }, [todoList, curDate]);

    const decreaseDate = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()-1)
        );
    }

    const increaseDate = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()+1)
        );
    }

    return (
        <div className="px-12">
            <div className="d-flex justify-center mt-5 w-100">
                <div className="w-100">
                    <MyHeader 
                        headText={getStringDate(curDate)}
                        leftChild={<MyButton text={"<"} onClick={decreaseDate} />}
                        rightChild={<MyButton text={">"} onClick={increaseDate} />}
                    />
                    <TodoList todoList={data} curDate={getStringDate(curDate)} />
                </div>
            </div>
        </div>
    );
}

export default Home;