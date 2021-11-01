import React, { Component, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import TodoItem from "./TodoItem";
import TodoService from "./services/TodoService";
import { useDispatch, useSelector } from "react-redux";

const Todo = (props) => {
  const todoList = useSelector((state) => state); //dòng này chưa hiểu gì cả?
  const dispatch = useDispatch(); //tại sao nó hiểu dispatch nào???

  const [currentInput, setcurrentInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTodoID, setCurrentTodoID] = useState(null);
  const [errorString, setErrorString] = useState("");

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const fetchAllTodo = () => {
    dispatch(TodoService.getAll());
  };

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

    dispatch(
      TodoService.postTodo({
        id: Date.now(),
        value: currentInputTrim,
        status: "active",
      })
    );

    //sau khi thêm xóa trắng ô input và errorString
    setcurrentInput("");
    setErrorString("");
  };

  const handleDoneTodo = (id) => {
    let updateItem = todoList.find((item) => item.id === id);
    dispatch(
      TodoService.putTodo(id, {
        ...updateItem,
        status: "inactive",
      })
    );
  };

  const handleDeleteTodo = (id) => {
    dispatch(TodoService.deleteTodo(id));
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

    let updateItem = todoList.find((item) => item.id === currentTodoID);
    dispatch(
      TodoService.putTodo(currentTodoID, {
        ...updateItem,
        value: currentInputTrim,
      })
    );

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
          <TodoItem
            key={item.id}
            item={item}
            currentTodoID={currentTodoID}
            isUpdate={isUpdate}
            onDoneTodo={handleDoneTodo}
            onDeleteTodo={handleDeleteTodo}
            onStartUpdateTodo={handleStartUpdateTodo}
          ></TodoItem>
        ))}
      </div>
    </>
  );
};

export default Todo;
