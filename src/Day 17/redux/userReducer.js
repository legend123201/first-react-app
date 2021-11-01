import ACTIONS from "./action";

const initialUsers = {
  userList: [],
  isLoading: false,
  isSuccess: true,
  errorMessage: "",
};

// {
//   id: "1634909393070",
//   name: "Tuan Huy",
//   username: "huynt",
//   email: "tuanhuyngt",
//   phone: "0987654321",
// },
// {
//   id: "1634909393075",
//   name: "Van A",
//   username: "huynt",
//   email: "tuanhuyngt",
//   phone: "0987654321",
// },
// {
//   id: "1634909393077",
//   name: "Tuan Name",
//   username: "username",
//   email: "use@email",
//   phone: "0987654321",
// },

const userReducer = (state = initialUsers, action) => {
  //----------Bằng api-------------
  switch (action.type) {
    case ACTIONS.FETCH_ALL:
    case ACTIONS.ADD_USER:
    case ACTIONS.DEL_USER:
    case ACTIONS.EDIT_USER:
      console.log("1");
      //have no payload
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.FETCH_ALL_FAILURE:
    case ACTIONS.ADD_USER_FAILURE:
    case ACTIONS.DEL_USER_FAILURE:
    case ACTIONS.EDIT_USER_FAILURE:
      console.log("2");
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
        userList: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS.ADD_USER_SUCCESS:
      //payload is new object
      return {
        ...state,
        userList: [...state.userList, action.payload],
        isLoading: false,
        isSuccess: true,
      };

    case ACTIONS.DEL_USER_SUCCESS:
      //payload is id
      return {
        ...state,
        userList: state.userList.filter((i) => i.id !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS.EDIT_USER_SUCCESS: {
      let copyList = [...state.userList];

      //payload is edit user
      //tìm phần tử đang sửa và sửa value
      let updateItemIndex = copyList.findIndex(
        (item) => item.id === action.payload.id
      );
      copyList[updateItemIndex] = { ...action.payload };

      return {
        ...state,
        userList: copyList,
        isLoading: false,
        isSuccess: true,
      };
    }
    default:
      return state;
  }

  //----------Ko bằng api-------------
  /*
  switch (action.type) {
    case ACTIONS.EDIT_USER:
      let copyList = [...state];
      let updateItemIndex = copyList.findIndex((item) => item.id === action.payload.id);
      copyList[updateItemIndex] = { ...action.payload };
      return copyList;
    case ACTIONS.FETCH_ALL:
      return state;
    case ACTIONS.ADD_USER:
      return [...state, action.payload];
    case ACTIONS.DEL_USER:
      return state.filter(t => t.id !== action.payload.id);
    default:
      return state;
  }
  */
};

export default userReducer;
