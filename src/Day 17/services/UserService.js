import userAction from "../redux/userAction";
import http from "./BaseService";

const getAllUser = (myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(userAction.fetchAllUser());

    try {
      let res = await http.get("/userList");
      dispatch(userAction.fetchAllSuccess(res.data));
    } catch (e) {
      dispatch(userAction.fetchAllFailure(String(e)));
    } finally {
      //console.log(getState().user.isSuccess); getState() trả về cái global state tổng mới nhất, async thunk là vậy
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const postUser = (data, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(userAction.addUser());

    try {
      let res = await http.post("/userLists", data);
      dispatch(userAction.addUserSuccess(res.data));
    } catch (e) {
      dispatch(userAction.addUserFailure(String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const deleteUser = (id, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(userAction.deleteUser());

    try {
      let res = await http.delete(`/userLists/${id}`);
      dispatch(userAction.deleteUserSuccess(id));
    } catch (e) {
      dispatch(userAction.deleteUserFailure(String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const editUser = (data, myCallBack) => {
  return async (dispatch, getState) => {
    dispatch(userAction.editUser());

    try {
      let res = await http.put(`/userList/${data.id}`, data);
      dispatch(userAction.editUserSuccess(res.data));
    } catch (e) {
      dispatch(userAction.editUserFailure(String(e)));
    } finally {
      myCallBack(getState().user.isSuccess, getState().user.errorMessage);
    }
  };
};

const UserService = {
  getAllUser,
  postUser,
  deleteUser,
  editUser,
};

export default UserService;
