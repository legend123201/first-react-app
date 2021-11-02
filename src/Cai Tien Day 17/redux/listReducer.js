import ACTIONS from "./action";

const initialList = {
  listData: [],
  isLoading: false,
  isSuccess: true,
  errorMessage: "",
};

const createListReducerNameData = (specifiedListName = "") => {
  return function listReducer(state = initialList, action) {
    const { listName } = action;
    if (listName !== specifiedListName) return state;

    switch (action.type) {
      case ACTIONS.FETCH_ALL:
      case ACTIONS.ADD_ITEM:
      case ACTIONS.DEL_ITEM:
      case ACTIONS.EDIT_ITEM:
        //have no payload
        return {
          ...state,
          isLoading: true,
        };

      case ACTIONS.FETCH_ALL_FAILURE:
      case ACTIONS.ADD_ITEM_FAILURE:
      case ACTIONS.DEL_ITEM_FAILURE:
      case ACTIONS.EDIT_ITEM_FAILURE:
        //payload is a error string
        return {
          ...state,
          isLoading: false,
          isSuccess: false,
          errorMessage: action.payload,
        };
      case ACTIONS.FETCH_ALL_SUCCESS:
        //payload is array
        return {
          ...state,
          listData: action.payload,
          isLoading: false,
          isSuccess: true,
        };
      case ACTIONS.ADD_ITEM_SUCCESS:
        //payload is new object
        return {
          ...state,
          listData: [...state.listData, action.payload],
          isLoading: false,
          isSuccess: true,
        };

      case ACTIONS.DEL_ITEM_SUCCESS:
        //payload is id
        return {
          ...state,
          listData: state.listData.filter((i) => i.id !== action.payload),
          isLoading: false,
          isSuccess: true,
        };
      case ACTIONS.EDIT_ITEM_SUCCESS: {
        let copyList = [...state.listData];

        //payload is edit ITEM
        //tìm phần tử đang sửa và sửa value
        let updateItemIndex = copyList.findIndex(
          (item) => item.id === action.payload.id
        );
        copyList[updateItemIndex] = { ...action.payload };

        return {
          ...state,
          listData: copyList,
          isLoading: false,
          isSuccess: true,
        };
      }
      default:
        return state;
    }
  };
};

export default createListReducerNameData;
