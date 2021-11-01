import http from "./BaseService";

const getAll = () => {
  return http.get("/todos");
};

const postTodo = (data) => {
  return http.post("/todos", data);
};

const deleteTodo = (id) => {
  return http.delete(`/todos/${id}`);
};

const putTodo = (id, data) => {
  return http.put(`/todos/${id}`, data);
};

const TodoService = {
  getAll,
  postTodo,
  deleteTodo,
  putTodo,
};

export default TodoService;
