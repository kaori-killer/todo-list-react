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
    case 'REMOVE': {
      newState = state.filter((it)=> it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it)
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
    const localData = localStorage.getItem("todo");
        if(localData) {
      const todoList = JSON.parse(localData).sort((a, b)=>parseInt(b.id) - parseInt(a.id));
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
          isEdit: false,
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

  const onEdit = (targetId, date, content, isEdit) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date,
        content,
        isEdit: false,
      }
    });
  }

  const onChangeIsEditStatus = (targetId, content) => {
    data.map((it)=>{
      if(it.id === targetId){
        dispatch({
          type: "EDIT",
          data: {
            id: targetId,
            date: it.date,
            content,
            isEdit: true
          }
        });
      } 
    })
  }

  return (
    <TodoStateContext.Provider value={{data}}>
      <TodoDispatchContext.Provider value={{
        onCreate,
        onRemove,
        onEdit,
        onChangeIsEditStatus,
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
