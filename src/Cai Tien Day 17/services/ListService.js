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
            // nhưng cũng có trường hợp lỗi mà server không thể trả về (vd: mình chưa chạy server)
            const messageError = e.response ? e.response.data.message : e.toString();
            dispatch(listAction.fetchAllFailure(listName, messageError));
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
            const messageError = e.response ? e.response.data.message : e.toString();
            dispatch(listAction.addItemFailure(listName, messageError));
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
            const messageError = e.response ? e.response.data.message : e.toString();
            dispatch(listAction.deleteItemFailure(listName, messageError));
        } finally {
            myCallBack(getState());
        }
    };
};

const editItem = (listName, data, myCallBack) => {
    return async (dispatch, getState) => {
        dispatch(listAction.editItem(listName));

        try {
            let res = await http.put(apiUrlByListName(listName) + `/${data.id}`, data);
            dispatch(listAction.editItemSuccess(listName));
        } catch (e) {
            const messageError = e.response ? e.response.data.message : e.toString();
            dispatch(listAction.editItemFailure(listName, messageError));
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
