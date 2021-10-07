import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { v1 as uuidv1 } from "uuid"; //npm i uuid
import userList from "./UserList";
import "./styles.css";

const Todo = (props) => {
  const [todoList, setTodoList] = useState(userList[0].todoList);
  const [currentInput, setcurrentInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTodoID, setCurrentTodoID] = useState(null);
  const [errorString, setErrorString] = useState("");

  const onInputChange = (event) => {
    setcurrentInput(event.target.value);
  };

  const handleAddTodo = () => {
    let currentInputTrim = currentInput.trim();
    if (currentInputTrim === "" || currentInputTrim.length > 15) {
      setErrorString("Không được để trống và dài quá 15 kí tự!");
      setcurrentInput(currentInputTrim);
      return;
    }

    //thêm vào todo list
    setTodoList([
      ...todoList,
      {
        id: uuidv1(),
        value: currentInputTrim,
        status: "active",
      },
    ]);

    //sau khi thêm xóa trắng ô input và errorString
    setcurrentInput("");
    setErrorString("");
  };

  const handleDoneTodo = (id) => {
    let copyList = [...todoList];

    //tìm phần tử todo trong mảng và set active
    let updateItemIndex = copyList.findIndex((item) => item.id === id);
    copyList[updateItemIndex].status = "inactive";

    //làm mới todo list
    setTodoList(copyList);
  };

  const handleDeleteTodo = (id) => {
    let copyList = [...todoList];

    //lọc các phần tử, bỏ đi phần tử có id đang cần xóa
    let newList = copyList.filter((item) => {
      return item.id !== id;
    });

    //làm mới todo list
    setTodoList(newList);
  };

  //khởi đầu việc update
  const handleStartUpdateTodo = (id) => {
    let copyList = [...todoList];

    //tìm phần tử cần sửa và cho value của nó vào ô input
    let updateItemIndex = copyList.findIndex((item) => item.id === id);
    let string = copyList[updateItemIndex].value;
    setcurrentInput(string);

    //set isUpdate là true để disable các nút ko liên quan, và lưu lại id của phần tử đang sửa
    setIsUpdate(true);
    setCurrentTodoID(id);
  };

  const handleCancelUpdateTodo = () => {
    //xóa trắng ô input và set isUpdate là false lại
    setcurrentInput("");
    setIsUpdate(false);
    setCurrentTodoID(null); //set id phần tử đang sửa về lại null cho an toàn
  };

  const handleUpdateTodo = () => {
    let currentInputTrim = currentInput.trim();
    if (currentInputTrim === "" || currentInputTrim.length > 15) {
      setErrorString("Không được để trống và dài quá 15 kí tự!");
      setcurrentInput(currentInputTrim);
      return;
    }

    let copyList = [...todoList];

    //tìm phần tử đang sửa và sửa value
    let updateItemIndex = copyList.findIndex(
      (item) => item.id === currentTodoID
    );
    copyList[updateItemIndex].value = currentInputTrim;

    //sửa xong xóa trắng ô input và hoàn thành việc sửa (isUpdate thành false lại)
    setcurrentInput("");
    setIsUpdate(false);
    setCurrentTodoID(null); //set id phần tử đang sửa về lại null cho an toàn
    setErrorString(""); //xóa trắng phần errorString
  };

  return (
    <>
      <div className="todo-wrapper">
        <h1>Todo List</h1>
        <div className="flex-wrapper">
          <input
            onChange={onInputChange}
            type="text"
            value={currentInput}
          ></input>
          <button onClick={handleAddTodo} disabled={isUpdate}>
            Add
          </button>
          <button onClick={handleUpdateTodo} disabled={!isUpdate}>
            Update
          </button>
          <button onClick={handleCancelUpdateTodo} disabled={!isUpdate}>
            Cancel
          </button>
        </div>

        <p className="error-string">{errorString}</p>

        {todoList.map((item, index) => (
          <div
            className={
              item.id === currentTodoID ? "todo-item bg-change" : "todo-item"
            }
            key={item.id}
          >
            <p className={item.status === "inactive" ? "line-through" : ""}>
              {item.value}
            </p>
            <button
              disabled={isUpdate}
              onClick={() => {
                handleDoneTodo(item.id);
              }}
            >
              Done
            </button>
            <button
              disabled={isUpdate}
              onClick={() => {
                handleDeleteTodo(item.id);
              }}
            >
              Delete
            </button>
            <button
              disabled={isUpdate}
              onClick={() => {
                handleStartUpdateTodo(item.id);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
