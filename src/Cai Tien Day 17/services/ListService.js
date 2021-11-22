import allList from "../redux/allList";
import listAction from "../redux/listAction";
import http from "./BaseService";

const apiUrlByListName = (listName) => {
  switch (listName) {
    case allList.USER:
      return "/userList";
    case allList.TODO:
      return "/todos";
    default:
      return "";
  }
};

const getAllItem = (listName, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.fetchAll(listName));

    try {
      let res = await http.get(apiUrlByListName(listName));
      //console.log(res.data);
      dispatch(listAction.fetchAllSuccess(listName, res.data.data));
    } catch (e) {
      //"e" là 1 object nhiều props, ".response" là từ dữ liệu server trả về, ".data.message" là object server định nghĩa
      //console.log(e.response.data.message);
      dispatch(listAction.fetchAllFailure(listName, e.response.data.message));
    } finally {
      //console.log(getState().user.isSuccess); getState() trả về cái global state tổng mới nhất, async thunk là vậy
      myCallBack(getState());
    }
  };
};

const postItem = (listName, data, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.addItem(listName));

    try {
      let res = await http.post(apiUrlByListName(listName), data);
      dispatch(listAction.addItemSuccess(listName));
    } catch (e) {
      dispatch(listAction.addItemFailure(listName, e.response.data.message));
    } finally {
      myCallBack(getState());
    }
  };
};

const deleteItem = (listName, id, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.deleteItem(listName));

    try {
      let res = await http.delete(apiUrlByListName(listName) + `/${id}`);
      dispatch(listAction.deleteItemSuccess(listName));
    } catch (e) {
      dispatch(listAction.deleteItemFailure(listName, e.response.data.message));
    } finally {
      myCallBack(getState());
    }
  };
};

const editItem = (listName, data, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.editItem(listName));

    try {
      let res = await http.put(
        apiUrlByListName(listName) + `/${data.id}`,
        data
      );
      dispatch(listAction.editItemSuccess(listName));
    } catch (e) {
      dispatch(listAction.editItemFailure(listName, e.response.data.message));
    } finally {
      myCallBack(getState());
    }
  };
};

const ListService = {
  getAllItem,
  postItem,
  deleteItem,
  editItem,
};

export default ListService;
