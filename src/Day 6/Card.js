import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import todoItems from "./todoList";
import { v1 as uuidv1 } from "uuid"; //npm i uuid

const Card = (props) => {
  const [count, setCount] = useState(5); //số 5 là giá trị khởi tạo cho biến count
  const [btnClass1, setBtnClass1] = useState("bg-blue");
  const [btnClass2, setBtnClass2] = useState("bg-blue");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [todoList, setTodoList] = useState(todoItems);
  const [currTodo, setCurrTodo] = useState("");

  const incCount = () => {
    setCount(count + 1);
    checkCount(count + 1);
  };

  const decCount = () => {
    setCount(count - 1);
    checkCount(count - 1);
  };

  //phải cần biến currentCount vì cái count phải hết hàm incCount hay decCount nó mới được update
  const checkCount = (currenCount) => {
    //btn 1
    if (currenCount >= 10) {
      setBtnClass1("bg-red");
    } else {
      setBtnClass1("bg-blue");
    }
    //btn 2
    if (currenCount <= 0) {
      setBtnClass2("bg-red");
    } else {
      setBtnClass2("bg-blue");
    }
  };

  const resetTime = () => {
    let newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  };

  //setInterval(resetTime, 1000);

  const onInputChange = (event) => {
    //console.log(event); //log ra 1 obj có 1 đống props
    //console.log(event.target); //log ra đúng cái html của cái input đó
    //console.log(event.target.value); //log ra giá trị ô input
    setCurrTodo(event.target.value);
  };

  const addTodoList = () => {
    /*
    //cách này lỗi bá cháy, liên quan tới previous state
    console.log(todoList.push(currTodo));
    todoList.push(currTodo);
    setTodoList(todoList);

    Cách nên làm:
    let copyList = [...todoList];
    copyList.push({
      id: uuidv1(),
      value: currTodo,
      status: "active",
    });
    setTodoList(copyList);
    */

    setTodoList([
      ...todoList,
      {
        id: uuidv1(),
        value: currTodo,
        status: "inactive",
      },
    ]); //cách này là cách ngắn và nhanh nhất

    setCurrTodo("");
  };

  const deleteTodoList = (id) => {
    let copyList = [...todoList];
    /*
    //nếu muốn xóa
    let newList = copyList.filter((item) => {
      return item.id !== id;
    });
    */
    let updateItem = copyList.findIndex((item) => item.id === id);
    copyList[updateItem].status = "active";
    setTodoList(copyList);
  };

  return (
    <>
      <div className="card">
        <img src={props.item.img} alt="Avatar" style={{ width: "100%" }} />
        <div className="container">
          <h4 className={props.name}>
            <b>{props.item.name}</b>
          </h4>
          <p>{props.item.job}</p>
        </div>
        <h1>Count: {count}</h1>
        <button className={btnClass1} onClick={incCount}>
          Increment
        </button>
        <button className={btnClass2} onClick={decCount}>
          Decrement
        </button>
        <p>Time: {time}</p>
        <h1>Todo List</h1>
        <input onChange={onInputChange} type="text" value={currTodo}></input>
        <button onClick={addTodoList}>Add todoList</button>
        {todoList.map((item, index) => (
          <div className="todo-item" key={item.id}>
            <p className={item.status === "active" ? "line-through" : ""}>
              {item.value}
            </p>
            <button
              onClick={() => {
                deleteTodoList(item.id);
              }}
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
