/*
//cái này dành cho bài day 17, reducer tổng của redux
import { combineReducers } from "redux";
import userReducer from "./Day 17/redux/userReducer";

const rootReducer = combineReducers({
  // Define a top-level state field
  user: userReducer,
});

export default rootReducer;
*/

import { combineReducers } from "redux";
import allList from "./Cai Tien Day 17/redux/allList";
import createListReducerNameData from "./Cai Tien Day 17/redux/listReducer";

const rootReducer = combineReducers({
  // Define a top-level state field
  user: createListReducerNameData(allList.USER),
  todo: createListReducerNameData(allList.TODO),
});

export default rootReducer;
