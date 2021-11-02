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
  return {
    type: ACTIONS.FETCH_ALL_FAILURE,
    payload: "Fetch item error! " + strError,
    listName: listName,
  };
};

const addItem = (listName) => {
  return {
    type: ACTIONS.ADD_ITEM,
    listName: listName,
  };
};

const addItemSuccess = (listName, newItem) => {
  return {
    type: ACTIONS.ADD_ITEM_SUCCESS,
    payload: newItem,
    listName: listName,
  };
};

const addItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.ADD_ITEM_FAILURE,
    payload: "Add item error! " + strError,
    listName: listName,
  };
};

const deleteItem = (listName) => {
  return {
    type: ACTIONS.DEL_ITEM,
    listName: listName,
  };
};

const deleteItemSuccess = (listName, idItem) => {
  return {
    type: ACTIONS.DEL_ITEM_SUCCESS,
    payload: idItem,
    listName: listName,
  };
};

const deleteItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.DEL_ITEM_FAILURE,
    payload: "Delete item error! " + strError,
    listName: listName,
  };
};

const editItem = (listName) => {
  return {
    type: ACTIONS.EDIT_ITEM,
    listName: listName,
  };
};

const editItemSuccess = (listName, editItem) => {
  return {
    type: ACTIONS.EDIT_ITEM_SUCCESS,
    payload: editItem,
    listName: listName,
  };
};

const editItemFailure = (listName, strError) => {
  return {
    type: ACTIONS.EDIT_ITEM_FAILURE,
    payload: "Edit item error! " + strError,
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
