import ACTIONS from "../redux/actions";
import http from "./BaseService";

const getAll = () => {
  //dispatch ở đây là của dispatch bên ngoài truyền vào, sao nó tự hiểu đc khi bên kia là mình gọi hàm dispatch(getAll) chứ ko có truyền param nào???
  return async (dispatch) => {
    const response = await http.get("/todos");
    if (response.status === 200) {
      dispatch({
        type: ACTIONS.FETCH_ALL_TODO,
        payload: response.data,
      });
    } else {
      console.log("error get all !");
    }
  };
};

const postTodo = (data) => {
  return async (dispatch) => {
    const response = await http.post("/todos", data);
    if (response.status === 201) {
      dispatch({
        type: ACTIONS.ADD_TODO,
        payload: data,
      });
    } else {
      console.log("error post todo !");
    }
  };
};

const deleteTodo = (id) => {
  return async (dispatch) => {
    const response = await http.delete(`/todos/${id}`);
    if (response.status === 200) {
      dispatch({
        type: ACTIONS.DELETE_TODO,
        payload: { id: id },
      });
    } else {
      console.log("error delete todo !");
    }
  };
};

const putTodo = (id, data) => {
  //return http.put(`/todos/${id}`, data);
  return async (dispatch) => {
    const response = await http.put(`/todos/${id}`, data);
    if (response.status === 200) {
      dispatch({
        type: ACTIONS.UPDATE_TODO,
        payload: {
          id: id,
          data: data,
        },
      });
    } else {
      console.log("error put todo !");
    }
  };
};

const TodoService = {
  getAll,
  postTodo,
  deleteTodo,
  putTodo,
};

export default TodoService;
