import ACTIONS from "./action";

const fetchAllUser = () => {
  return {
    type: ACTIONS.FETCH_ALL,
  };
};

const fetchAllSuccess = (arrData) => {
  return {
    type: ACTIONS.FETCH_ALL_SUCCESS,
    payload: arrData,
  };
};

const fetchAllFailure = (strError) => {
  return {
    type: ACTIONS.FETCH_ALL_FAILURE,
    payload: "Fetch user error! " + strError,
  };
};

const addUser = () => {
  return {
    type: ACTIONS.ADD_USER,
  };
};

const addUserSuccess = (newUser) => {
  return {
    type: ACTIONS.ADD_USER_SUCCESS,
    payload: newUser,
  };
};

const addUserFailure = (strError) => {
  return {
    type: ACTIONS.ADD_USER_FAILURE,
    payload: "Add user error! " + strError,
  };
};

const deleteUser = () => {
  return {
    type: ACTIONS.DEL_USER,
  };
};

const deleteUserSuccess = (idUser) => {
  return {
    type: ACTIONS.DEL_USER_SUCCESS,
    payload: idUser,
  };
};

const deleteUserFailure = (strError) => {
  return {
    type: ACTIONS.DEL_USER_FAILURE,
    payload: "Delete user error! " + strError,
  };
};

const editUser = () => {
  return {
    type: ACTIONS.EDIT_USER,
  };
};

const editUserSuccess = (editUser) => {
  return {
    type: ACTIONS.EDIT_USER_SUCCESS,
    payload: editUser,
  };
};

const editUserFailure = (strError) => {
  return {
    type: ACTIONS.EDIT_USER_FAILURE,
    payload: "Edit user error! " + strError,
  };
};

const userAction = {
  fetchAllUser,
  fetchAllSuccess,
  fetchAllFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  editUser,
  editUserSuccess,
  editUserFailure,
};

export default userAction;
