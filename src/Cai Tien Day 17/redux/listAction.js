import ACTIONS from "./action";

const fetchAll = (listName) => {
  return {
    type: ACTIONS.FETCH_ALL,
    listName: listName,
  };
};

const fetchAllSuccess = (listName, arrData) => {
  return {
    type: ACTIONS.FETCH_ALL_SUCCESS,
    payload: arrData,
    listName: listName,
  };
};

const fetchAllFailure = (listName, strError) => {
  //sẽ có trường hợp strError rỗng, vì mình lấy strError là lỗi từ server trả về, nhưng nếu đường link api sai thì server đâu thể trả về
  return {
    type: ACTIONS.FETCH_ALL_FAILURE,
    payload: "Fetch item error! " + (strError ? strError : "Lỗi call api!"),
    listName: listName,
  };
};

const addItem = (listName) => {
  return {
    type: ACTIONS.ADD_ITEM,
    listName: listName,
  };
};

const addItemSuccess = (listName) => {
  return {
    type: ACTIONS.ADD_ITEM_SUCCESS,
    listName: listName,
  };
};

const addItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.ADD_ITEM_FAILURE,
    payload: "Add item error! " + (strError ? strError : "Lỗi call api!"),
    listName: listName,
  };
};

const deleteItem = (listName) => {
  return {
    type: ACTIONS.DEL_ITEM,
    listName: listName,
  };
};

const deleteItemSuccess = (listName) => {
  return {
    type: ACTIONS.DEL_ITEM_SUCCESS,
    listName: listName,
  };
};

const deleteItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.DEL_ITEM_FAILURE,
    payload: "Delete item error! " + (strError ? strError : "Lỗi call api!"),
    listName: listName,
  };
};

const editItem = (listName) => {
  return {
    type: ACTIONS.EDIT_ITEM,
    listName: listName,
  };
};

const editItemSuccess = (listName) => {
  return {
    type: ACTIONS.EDIT_ITEM_SUCCESS,
    listName: listName,
  };
};

const editItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.EDIT_ITEM_FAILURE,
    payload: "Edit item error! " + (strError ? strError : "Lỗi call api!"),
    listName: listName,
  };
};

const listAction = {
  fetchAll,
  fetchAllSuccess,
  fetchAllFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  editItem,
  editItemSuccess,
  editItemFailure,
};

export default listAction;
