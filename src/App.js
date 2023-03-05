import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useReducer, useRef }  from 'react';

import Home from "./pages/Home";

import getStringDate from '../src/util/date';

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
}

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(() => {
    // const localData = localStorage.getItem("todo");
    const localData = [
        {
          id: 1,
          date: getStringDate(new Date()),
          content: "hello1",
        },
        {
          id: 2,
          date: getStringDate(new Date()),
          content: "hello2",
        },
        {
          id: 3,
          date: getStringDate(new Date()),
          content: "hello3",
        },
        {
          id: 4,
          date: '2023-03-04',
          content: "hello4"
        }
    ].sort((a, b)=>parseInt(b.id)-parseInt(a.id));
    if(localData) {
      // const todoList = JSON.parse(localData).sort((a, b)=>parseInt(b.id) - parseInt(a.id));
      const todoList = localData;
      if(todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id) + 1;
      }
      dispatch({
        type: "INIT",
        data: todoList
      });
    }
  }, []);

  const onCreate = (date, content) => {
    dispatch(
      {
        type: "CREATE",
        data: {
          id: dataId.current,
          date: date,
          content,
        }
      }
    );
    dataId.current += 1;
  }

  const onRemove = (targetId) => {
    dispatch(
      {
        type: "REMOVE",
        targetId
      }
    )
  };

  return (
    <TodoStateContext.Provider value={{data}}>
      <TodoDispatchContext.Provider value={{
        onCreate,
        onRemove,
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
