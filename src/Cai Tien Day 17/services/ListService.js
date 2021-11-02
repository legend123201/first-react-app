import allList from "../redux/allList";
import listAction from "../redux/listAction";
import http from "./BaseService";

const apiUrlByListName = (listName) => {
  switch (listName) {
    case allList.USER:
      return "/userList";
    case allList.TODO:
      return "/todoList";
    default:
      return "";
  }
};

const getAllItem = (listName, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.fetchAll(listName));

    try {
      let res = await http.get(apiUrlByListName(listName));
      dispatch(listAction.fetchAllSuccess(listName, res.data));
    } catch (e) {
      dispatch(listAction.fetchAllFailure(listName, String(e)));
    } finally {
      //console.log(getState().user.isSuccess); getState() trả về cái global state tổng mới nhất, async thunk là vậy
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const postItem = (listName, data, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.addItem(listName));

    try {
      let res = await http.post(apiUrlByListName(listName), data);
      dispatch(listAction.addItemSuccess(listName, res.data));
    } catch (e) {
      dispatch(listAction.addItemFailure(listName, String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const deleteItem = (listName, id, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(listAction.deleteItem(listName));

    try {
      let res = await http.delete(apiUrlByListName(listName) + `/${id}`);
      dispatch(listAction.deleteItemSuccess(listName, id));
    } catch (e) {
      dispatch(listAction.deleteItemFailure(listName, String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
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
      dispatch(listAction.editItemSuccess(listName, res.data));
    } catch (e) {
      dispatch(listAction.editItemFailure(listName, String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
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
