import ACTIONS from "./actions";

const initialState = [{ id: 1, status: "active", value: "test" }];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_TODO: {
      return action.payload;
    }
    case ACTIONS.ADD_TODO: {
      return [...state, action.payload];
    }
    case ACTIONS.DELETE_TODO: {
      return state.filter((item) => item.id !== action.payload.id);
    }
    case ACTIONS.UPDATE_TODO: {
      let copyList = [...state];

      //tìm phần tử đang sửa và sửa value
      let updateItemIndex = copyList.findIndex(
        (item) => item.id === action.payload.id
      );
      copyList[updateItemIndex] = { ...action.payload.data };

      return copyList;
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
