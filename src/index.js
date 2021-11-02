import React from "react"; //import object React từ module react, module này trong nodejs
import ReactDOM from "react-dom";
//import "bootstrap/dist/css/bootstrap.css";

//import name, { birth, getLastName } from "./Day 5/Name"; //cách import 1
//import * as name2 from "./Day 5/Name2"; //cách import 2

//-----------------------Day 17--------------------------------
import App from "./Cai Tien Day 17/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

/*
//-----------------------reduxTutorial--------------------------------
import App from "./reduxTutorial/App";
ReactDOM.render(<App></App>, document.getElementById("root"));
*/

/*
//-----------------------mui--------------------------------
import App from "./mui/App";

ReactDOM.render(<App></App>, document.getElementById("root"));
*/

/*
//-----------------------Day 15--------------------------------
import Todo from "./Day 15/Todo";
import { applyMiddleware, createStore } from "redux";
import todoReducer from "./Day 15/redux/todoReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  todoReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Todo></Todo>
  </Provider>,

  document.getElementById("root")
);
*/

/*
//-----------------------Day 10--------------------------------
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import Todo from "./Day 10/Todo";
import Login from "./Day 10/Login";
import About from "./Day 10/About";

ReactDOM.render(
  <BrowserRouter>
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/todo" component={Todo}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
*/

/*
//-----------------------Day 6--------------------------------
import Card from "./Day 6/Card";
import items from "./Day 6/itemList";

let itemList = items.map((item) => (
  <Card
    key={item.id}
    item={item}
    name={item.type === "blue" ? "bg-blue" : "bg-red"}
  ></Card>
));

ReactDOM.render(<>{itemList}</>, document.getElementById("root"));
*/

/*
//-----------------------components--------------------------------
import LearnCounter from "./components/learnCounters";
import App from "./components/app";

const element = <h1>Hello World12345!</h1>;
console.log(element);
reactDom.render(element, document.getElementById("root"));

//reactDom.render(<LearnCounter />, document.getElementById("root"));
reactDom.render(<App />, document.getElementById("root"));

*/

/*
//-----------------------Day 5--------------------------------
ReactDOM.render(
  <>
    <h1>
      Hello {name}, {getLastName()}
    </h1>
    <h1>Birth: {birth}</h1>

    <h1>{name2.default()}</h1>
  </>,
  document.getElementById("root")
);
*/
